import { Request, Response } from 'express'
import { pool } from '../db/pool.js'
import { AuthenticatedRequest } from '../middleware/auth.js'

const PENALTY = 0.25

export async function getExams(req: Request, res: Response): Promise<void> {
  try {
    const examsRes = await pool.query(`
      SELECT e.*, COALESCE(COUNT(q.id), 0) as total_questions
      FROM exams e
      LEFT JOIN exam_sections s ON e.id = s.exam_id
      LEFT JOIN questions q ON s.id = q.section_id
      GROUP BY e.id
    `)
    res.json({ exams: examsRes.rows })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error fetching exams.' })
  }
}

export async function getExamQuestions(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const examRes = await pool.query('SELECT * FROM exams WHERE id = $1', [id])
    if (examRes.rowCount === 0) {
      res.status(404).json({ error: 'Exam not found.' })
      return
    }

    const sectionsRes = await pool.query('SELECT * FROM exam_sections WHERE exam_id = $1', [id])

    const questionsRes = await pool.query(`
      SELECT q.id, q.section_id, q.question_text, q.options, q.correct_answer_index, q.explanation
      FROM questions q
      JOIN exam_sections s ON q.section_id = s.id
      WHERE s.exam_id = $1
      ORDER BY q.id ASC
    `, [id])

    res.json({
      exam: examRes.rows[0],
      sections: sectionsRes.rows,
      questions: questionsRes.rows
    })
  } catch (err) {
    console.error('Error fetching exam questions:', err)
    res.status(500).json({ error: 'Internal server error fetching questions.' })
  }
}

export async function startExamAttempt(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  const { id } = req.params
  const { remainingTime } = req.body

  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  if (remainingTime !== undefined && (typeof remainingTime !== 'number' || remainingTime < 0 || remainingTime > 14400)) {
    res.status(400).json({ error: 'Invalid remainingTime.' })
    return
  }

  try {
    const examRes = await pool.query('SELECT * FROM exams WHERE id = $1', [id])
    if (examRes.rowCount === 0) {
      res.status(404).json({ error: 'Exam not found.' })
      return
    }
    const exam = examRes.rows[0]

    const activeRes = await pool.query(`
      SELECT * FROM user_exam_attempts
      WHERE user_id = $1 AND exam_id = $2 AND is_completed = FALSE
      ORDER BY created_at DESC LIMIT 1
    `, [authReq.user.id, id])

    if (activeRes.rowCount && activeRes.rowCount > 0) {
      const activeAttempt = activeRes.rows[0]
      const answersRes = await pool.query(
        'SELECT question_id, selected_option_index FROM attempt_answers WHERE attempt_id = $1',
        [activeAttempt.id]
      )
      res.json({
        attemptId: activeAttempt.id,
        remainingTime: activeAttempt.remaining_time ?? exam.duration,
        savedAnswers: answersRes.rows,
        message: 'Resuming existing active session.'
      })
      return
    }

    const duration = exam.duration
    const insertRes = await pool.query(`
      INSERT INTO user_exam_attempts (user_id, exam_id, remaining_time, is_completed)
      VALUES ($1, $2, $3, FALSE)
      RETURNING id
    `, [authReq.user.id, id, remainingTime ?? duration])

    res.status(201).json({
      attemptId: insertRes.rows[0].id,
      remainingTime: remainingTime ?? duration,
      savedAnswers: [],
      message: 'Started new exam session.'
    })
  } catch (err) {
    console.error('Error starting exam attempt:', err)
    res.status(500).json({ error: 'Internal server error starting attempt.' })
  }
}

export async function saveAttemptAnswer(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  const { attemptId } = req.params
  const { questionId, selectedOptionIndex, remainingTime } = req.body

  if (questionId === undefined || selectedOptionIndex === undefined) {
    res.status(400).json({ error: 'questionId and selectedOptionIndex are required.' })
    return
  }

  if (typeof questionId !== 'number' || questionId < 1) {
    res.status(400).json({ error: 'Invalid questionId.' })
    return
  }

  if (typeof selectedOptionIndex !== 'number' || selectedOptionIndex < -1 || selectedOptionIndex > 3) {
    res.status(400).json({ error: 'Invalid selectedOptionIndex. Must be -1 (skip) or 0-3.' })
    return
  }

  if (remainingTime !== undefined && (typeof remainingTime !== 'number' || remainingTime < 0 || remainingTime > 14400)) {
    res.status(400).json({ error: 'Invalid remainingTime.' })
    return
  }

  try {
    const attemptRes = await pool.query('SELECT id, user_id, is_completed FROM user_exam_attempts WHERE id = $1', [attemptId])
    if (attemptRes.rowCount === 0) {
      res.status(404).json({ error: 'Exam attempt not found.' })
      return
    }

    const attempt = attemptRes.rows[0]

    if (attempt.user_id !== authReq.user.id) {
      res.status(403).json({ error: 'You do not have access to this exam attempt.' })
      return
    }

    if (attempt.is_completed) {
      res.status(400).json({ error: 'This exam attempt has already been submitted.' })
      return
    }

    const qRes = await pool.query('SELECT correct_answer_index FROM questions WHERE id = $1', [questionId])
    if (qRes.rowCount === 0) {
      res.status(404).json({ error: 'Question not found.' })
      return
    }

    const isCorrect = selectedOptionIndex !== -1 && qRes.rows[0].correct_answer_index === selectedOptionIndex

    await pool.query(`
      INSERT INTO attempt_answers (attempt_id, question_id, selected_option_index, is_correct)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (attempt_id, question_id)
      DO UPDATE SET selected_option_index = $3, is_correct = $4
    `, [attemptId, questionId, selectedOptionIndex, isCorrect])

    if (remainingTime !== undefined) {
      await pool.query('UPDATE user_exam_attempts SET remaining_time = $1 WHERE id = $2', [remainingTime, attemptId])
    }

    res.json({ success: true, isCorrect })
  } catch (err) {
    console.error('Error saving answer:', err)
    res.status(500).json({ error: 'Internal server error saving answer.' })
  }
}

export async function submitExamAttempt(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  const { attemptId } = req.params
  const { timeSpent } = req.body

  try {
    const attemptRes = await pool.query('SELECT * FROM user_exam_attempts WHERE id = $1', [attemptId])
    if (attemptRes.rowCount === 0) {
      res.status(404).json({ error: 'Exam attempt not found.' })
      return
    }

    const attempt = attemptRes.rows[0]

    if (attempt.user_id !== authReq.user.id) {
      res.status(403).json({ error: 'You do not have access to this exam attempt.' })
      return
    }

    if (attempt.is_completed) {
      res.status(400).json({ error: 'This exam attempt has already been submitted.' })
      return
    }

    const totalQRes = await pool.query(`
      SELECT q.id, q.correct_answer_index, q.section_id
      FROM questions q
      JOIN exam_sections s ON q.section_id = s.id
      WHERE s.exam_id = $1
    `, [attempt.exam_id])

    const totalQuestions = totalQRes.rows

    const answersRes = await pool.query('SELECT * FROM attempt_answers WHERE attempt_id = $1', [attemptId])
    const recordedAnswers = new Map<number, { selected_option_index: number; is_correct: boolean }>()
    for (const row of answersRes.rows) {
      recordedAnswers.set(row.question_id, {
        selected_option_index: row.selected_option_index,
        is_correct: row.is_correct
      })
    }

    let correctAnswers = 0
    let wrongAnswers = 0
    let skippedAnswers = 0
    let calculatedScore = 0.0

    const examRes = await pool.query('SELECT negative_marking FROM exams WHERE id = $1', [attempt.exam_id])
    const negativeMarking = examRes.rows[0]?.negative_marking ?? 0.25

    for (const q of totalQuestions) {
      const rec = recordedAnswers.get(q.id)
      if (!rec || rec.selected_option_index === -1) {
        skippedAnswers++
      } else if (rec.is_correct) {
        correctAnswers++
        calculatedScore += 1.0
      } else {
        wrongAnswers++
        calculatedScore -= negativeMarking
      }
    }

    await pool.query(`
      UPDATE user_exam_attempts
      SET score = $1,
          correct_answers = $2,
          wrong_answers = $3,
          skipped_answers = $4,
          time_spent = $5,
          is_completed = TRUE,
          completed_at = CURRENT_TIMESTAMP
      WHERE id = $6
    `, [calculatedScore, correctAnswers, wrongAnswers, skippedAnswers, timeSpent || 0, attemptId])

    res.json({
      success: true,
      attemptId,
      score: calculatedScore,
      correctAnswers,
      wrongAnswers,
      skippedAnswers
    })
  } catch (err) {
    console.error('Error submitting exam:', err)
    res.status(500).json({ error: 'Internal server error submitting exam.' })
  }
}

export async function getExamResults(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  const { attemptId } = req.params

  try {
    const attemptRes = await pool.query(`
      SELECT a.*, e.title, e.passing_score, e.category as exam_category, e.course as exam_course, e.case_no
      FROM user_exam_attempts a
      JOIN exams e ON a.exam_id = e.id
      WHERE a.id = $1
    `, [attemptId])

    if (attemptRes.rowCount === 0) {
      res.status(404).json({ error: 'Exam attempt not found.' })
      return
    }

    const attempt = attemptRes.rows[0]

    if (attempt.user_id !== authReq.user.id) {
      res.status(403).json({ error: 'You do not have access to this exam result.' })
      return
    }

    if (!attempt.is_completed) {
      res.status(400).json({ error: 'This exam attempt has not been submitted yet.' })
      return
    }

    const questionsRes = await pool.query(`
      SELECT 
        q.id, q.section_id, q.question_text, q.options, q.correct_answer_index, q.explanation,
        s.name as section_name,
        COALESCE(ans.selected_option_index, -1) as selected_option_index
      FROM questions q
      JOIN exam_sections s ON q.section_id = s.id
      LEFT JOIN attempt_answers ans ON q.id = ans.question_id AND ans.attempt_id = $1
      WHERE s.exam_id = $2
      ORDER BY q.id ASC
    `, [attemptId, attempt.exam_id])

    res.json({
      attempt,
      questions: questionsRes.rows
    })
  } catch (err) {
    console.error('Error fetching exam results:', err)
    res.status(500).json({ error: 'Internal server error fetching results.' })
  }
}

export async function getUserExamHistory(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  try {
    const historyRes = await pool.query(`
      SELECT 
        a.id as attempt_id,
        a.exam_id,
        a.score,
        a.correct_answers,
        a.wrong_answers,
        a.skipped_answers,
        a.time_spent,
        a.is_completed,
        a.created_at,
        a.completed_at,
        e.title as exam_title,
        e.category as exam_category,
        e.course as exam_course,
        e.passing_score,
        e.duration as total_duration,
        e.logo_url
      FROM user_exam_attempts a
      JOIN exams e ON a.exam_id = e.id
      WHERE a.user_id = $1 AND a.is_completed = TRUE
      ORDER BY a.completed_at DESC
    `, [authReq.user.id])

    const examsCountRes = await pool.query(`
      SELECT s.exam_id, COUNT(q.id) as total_questions
      FROM questions q
      JOIN exam_sections s ON q.section_id = s.id
      GROUP BY s.exam_id
    `)

    const examQuestionsMap = new Map<string, number>()
    for (const row of examsCountRes.rows) {
      examQuestionsMap.set(row.exam_id, parseInt(row.total_questions))
    }

    const history = historyRes.rows.map(row => {
      const totalQuestions = examQuestionsMap.get(row.exam_id) || 1
      return {
        ...row,
        total_questions: totalQuestions
      }
    })

    res.json({ history })
  } catch (err) {
    console.error('Error fetching exam history:', err)
    res.status(500).json({ error: 'Internal server error fetching exam history.' })
  }
}

export async function getActiveExamAttempts(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthenticatedRequest
  if (!authReq.user) {
    res.status(401).json({ error: 'Not authenticated.' })
    return
  }

  try {
    const activeRes = await pool.query(`
      SELECT 
        a.id as attempt_id, 
        a.exam_id, 
        a.remaining_time, 
        a.created_at, 
        e.title as exam_title, 
        e.duration as total_duration, 
        e.logo_url,
        COALESCE((SELECT COUNT(*) FROM attempt_answers WHERE attempt_id = a.id), 0) as answered_count,
        COALESCE((SELECT COUNT(q.id) FROM questions q JOIN exam_sections s ON q.section_id = s.id WHERE s.exam_id = a.exam_id), 0) as total_questions
      FROM user_exam_attempts a
      JOIN exams e ON a.exam_id = e.id
      WHERE a.user_id = $1 AND a.is_completed = FALSE
      ORDER BY a.created_at DESC
    `, [authReq.user.id])

    res.json({ activeAttempts: activeRes.rows })
  } catch (err) {
    console.error('Error fetching active exam attempts:', err)
    res.status(500).json({ error: 'Internal server error fetching active attempts.' })
  }
}
