import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { pool } from './pool.js'

function formatSectionName(varName: string): string {
  // e.g. "rawEnglish" -> "English"
  // e.g. "rawGeneral" -> "General Intelligence"
  // e.g. "rawProfessional" -> "Professional"
  let name = varName.replace(/^raw/i, '')
  // Add spaces before capital letters
  name = name.replace(/([A-Z])/g, ' $1').trim()
  return name
}

async function run() {
  const args = process.argv.slice(2)
  if (args.length < 1) {
    console.error('Usage: npm run db:import-exam -- <filePath> [examId] [title] [category] [course] [caseNo] [durationSeconds] [passingScore] [negativeMarking]')
    process.exit(1)
  }

  const filePath = path.resolve(args[0])
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at path "${filePath}"`)
    process.exit(1)
  }

  // Parse command line variables or apply reasonable defaults
  const examId = args[1] || path.basename(filePath, path.extname(filePath)).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const examTitle = args[2] || `${examId.toUpperCase().replace(/-/g, ' ')} Mock Simulation`
  const category = args[3] || 'FPSC'
  const course = args[4] || 'General Recruitment'
  const caseNo = args[5] || ''
  const duration = parseInt(args[6] || '7200') // default 2 hours
  const passingScore = parseFloat(args[7] || '40.0')
  const negativeMarking = parseFloat(args[8] || '0.25')
  const logoUrl = category.toLowerCase() // maps to logo_url (e.g. 'fpsc', 'ppsc')

  console.log(`\n=== IMPORT EXAM TOOL ===`)
  console.log(`Source File:       ${filePath}`)
  console.log(`Exam ID:           ${examId}`)
  console.log(`Title:             ${examTitle}`)
  console.log(`Category:          ${category}`)
  console.log(`Course:            ${course}`)
  console.log(`Case No:           ${caseNo}`)
  console.log(`Duration (s):      ${duration}`)
  console.log(`Passing Score (%): ${passingScore}`)
  console.log(`Negative Penalty:  ${negativeMarking}`)
  console.log(`Logo Key:          ${logoUrl}`)
  console.log(`========================\n`)

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Split to strip the React component (App) code
    const parts = fileContent.split(/export\s+default\s+function/i)
    const javascriptCode = parts[0]

    // Remove import statements so VM doesn't crash on ES Module syntax
    const cleanedCode = javascriptCode
      .split('\n')
      .filter(line => !line.trim().startsWith('import') && !line.trim().startsWith('require'))
      .join('\n')

    // Run the javascript variables block inside a safe VM sandbox context
    console.log('Parsing question arrays from code...')
    const context: any = {}
    vm.createContext(context)
    vm.runInContext(cleanedCode, context)

    // Discover all keys in VM context that represent question banks
    const arrayKeys = Object.keys(context).filter(key => {
      const val = context[key]
      return Array.isArray(val) && val.length > 0 && Array.isArray(val[0]) && val[0].length >= 3
    })

    if (arrayKeys.length === 0) {
      console.error('Error: No valid question arrays found in the file (e.g. rawEnglish = [[...]])')
      process.exit(1)
    }

    console.log(`Found ${arrayKeys.length} question array(s): ${arrayKeys.join(', ')}`)

    // Start Database Transaction
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // 1. Upsert Exam
      console.log('Saving exam metadata...')
      await client.query(`
        INSERT INTO exams (id, title, category, course, case_no, duration, passing_score, logo_url, negative_marking)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          course = EXCLUDED.course,
          case_no = EXCLUDED.case_no,
          duration = EXCLUDED.duration,
          passing_score = EXCLUDED.passing_score,
          logo_url = EXCLUDED.logo_url,
          negative_marking = EXCLUDED.negative_marking
      `, [examId, examTitle, category, course, caseNo, duration, passingScore, logoUrl, negativeMarking])

      // 2. Loop through sections
      for (const key of arrayKeys) {
        const rawArray = context[key] as any[]
        const sectionId = `${examId}-${key.toLowerCase().replace(/^raw/, '')}`
        const sectionName = formatSectionName(key)

        console.log(`Saving section "${sectionName}" (${rawArray.length} questions)...`)

        await client.query(`
          INSERT INTO exam_sections (id, exam_id, name)
          VALUES ($1, $2, $3)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name
        `, [sectionId, examId, sectionName])

        // Clear existing questions for this specific section to prevent duplicates
        await client.query('DELETE FROM questions WHERE section_id = $1', [sectionId])

        // Insert questions
        for (const question of rawArray) {
          const [questionText, options, correctAnswerIndex, explanation] = question
          await client.query(`
            INSERT INTO questions (section_id, question_text, options, correct_answer_index, explanation)
            VALUES ($1, $2, $3, $4, $5)
          `, [sectionId, questionText, options, correctAnswerIndex, explanation || ''])
        }
      }

      await client.query('COMMIT')
      console.log('\nSUCCESS: Exam and questions imported successfully!')
    } catch (dbErr) {
      await client.query('ROLLBACK')
      throw dbErr
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Import failed with error:', err)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

run()
