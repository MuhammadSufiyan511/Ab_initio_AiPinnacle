export interface CommissionSyllabus {
  id: string
  name: string
  fullName: string
  subName: string
  blueprintTitle: string
  specifications: {
    level: string
    questions: string
    time: string
    penalty: string
    passing: string
  }
  parts: {
    part1: {
      title: string
      subtitle: string
      topics: string[]
    }
    part2: {
      title: string
      subtitle: string
      topics: string[]
    }
    part3: {
      title: string
      subtitle: string
      topics: string[]
    }
  }
}

export const SYLLABUS_DATA: Record<string, CommissionSyllabus> = {
  FPSC: {
    id: 'FPSC',
    name: 'FPSC',
    fullName: 'Federal Public Service Commission',
    subName: 'Federal Cadres (FPSC F.4-74/2026-R)',
    blueprintTitle: 'FPSC System Analyst (BS-18) Blueprint',
    specifications: {
      level: "BS-18 Government Cadre",
      questions: "200 Verified MCQs",
      time: "100 Minutes (6,000s)",
      penalty: "-0.25 Per Wrong Answer",
      passing: "50% Passing Standard"
    },
    parts: {
      part1: {
        title: "Part I - English (Grammar & Vocabulary)",
        subtitle: "20% weightage • 40 Questions",
        topics: [
          "Vocabulary in Context (Synonyms, Antonyms, Analogies, and Latin Legal Maxims).",
          "Grammar Mechanics (Mixed conditionals, Subjunctive usages, spelling rules, prepositions).",
          "Dangling modifiers, sentence structures, and active/passive conversions."
        ]
      },
      part2: {
        title: "Part II - General Intelligence (Arithmetic & GK)",
        subtitle: "20% weightage • 40 Questions",
        topics: [
          "Quantitative Reasoning (Averages, age calculations, percentage changes, ratios, probability models).",
          "Arithmetic & Algebra (Clock mechanics, work rates, trains passing platforms, log bases, integrals, derivatives).",
          "General Knowledge (1973 Constitution of Pakistan Articles 58/95/112/245, Karakoram range, international AI summits)."
        ]
      },
      part3: {
        title: "Part III - Professional IT (Computer Science & SE)",
        subtitle: "60% weightage • 120 Questions",
        topics: [
          "Advanced Computer Architectures (Tomasulo's algorithm hazards, fully associative cache mappings, pipeline delay frequencies).",
          "Operating Systems (Working set models, thrashing limit formulas, Banker's matrix deadlock tools, zombie/orphan PIDs).",
          "Software Engineering Practices (SOLID components, Facade/Strategy pattern blueprints, Cyclomatic complexity equations).",
          "Data Structures & Databases (AVL tree rotations, B+ tree leaf linkages, BCNF superkey dependencies, ACID durability properties).",
          "Computer Networking (IPv6 blocks, IPsec architectures, Class B mask allocations, usable hosts in /28 subnets)."
        ]
      }
    }
  },
  SPSC: {
    id: 'SPSC',
    name: 'SPSC',
    fullName: 'Sindh Public Service Commission',
    subName: 'Sindh Provincial Cadres (SPSC AD-IT)',
    blueprintTitle: 'SPSC Assistant Director IT (BS-17) Blueprint',
    specifications: {
      level: "BS-17 Sindh Cadre",
      questions: "100 Verified MCQs",
      time: "90 Minutes (5,400s)",
      penalty: "-0.25 Per Wrong Answer",
      passing: "45% Passing Standard"
    },
    parts: {
      part1: {
        title: "Part I - English Comprehension & Vocabulary",
        subtitle: "20% weightage • 20 Questions",
        topics: [
          "Reading comprehension speed passages and critical phrase extractions.",
          "Sindh regional translation contexts, vocabulary lists, and synonyms.",
          "Idiomatic phrases, sentence correction rules, and direct/indirect speech transformations."
        ]
      },
      part2: {
        title: "Part II - General Science & Ability",
        subtitle: "30% weightage • 30 Questions",
        topics: [
          "Everyday Science (Environmental layers, vitamins, solar system mechanics).",
          "Provincial Geography & Sindh History (Mohenjo-daro, Indus River water allocations, local administrative structures).",
          "Pakistan Affairs & Current Affairs (Provincial budget layouts, CPEC economic routes)."
        ]
      },
      part3: {
        title: "Part III - Core Computer Science & Database Systems",
        subtitle: "50% weightage • 50 Questions",
        topics: [
          "Relational Algebra & SQL queries (Group By, Joins, subqueries, relational calculus).",
          "Data Structures (Stack operations, circular queues, binary search tree insertions).",
          "Computer Systems & Memory (Cache write-through vs write-back, RAM paging models).",
          "Data Communication (OSI reference layers, Ethernet CSMA/CD collision principles)."
        ]
      }
    }
  },
  PPSC: {
    id: 'PPSC',
    name: 'PPSC',
    fullName: 'Punjab Public Service Commission',
    subName: 'Punjab Provincial Tech Cadres',
    blueprintTitle: 'PPSC Software Developer (BS-17) Blueprint',
    specifications: {
      level: "BS-17 Punjab Cadre",
      questions: "100 Verified MCQs",
      time: "90 Minutes (5,400s)",
      penalty: "-0.25 Per Wrong Answer",
      passing: "40% Passing Standard"
    },
    parts: {
      part1: {
        title: "Part I - English Essay & Expression",
        subtitle: "10% weightage • 10 Questions",
        topics: [
          "Grammar mechanics, vocabulary in expression, spelling corrections.",
          "Idiomatic Punjab-to-English translations and prepositional matches."
        ]
      },
      part2: {
        title: "Part II - Punjab General Knowledge & Aptitude",
        subtitle: "10% weightage • 10 Questions",
        topics: [
          "General Knowledge (Punjab canal systems, Harappa ruins, local governance).",
          "Basic Math & Logic (Coding-decoding series, calendar logic, average age calculations)."
        ]
      },
      part3: {
        title: "Part III - Software Engineering & Programming",
        subtitle: "80% weightage • 80 Questions",
        topics: [
          "Object-Oriented Programming (OOP polymorphism, strict inheritance, C++/Java/Python syntax).",
          "Software Design Patterns (Singleton, Abstract Factory, Observer, MVC architectures).",
          "Software Development Lifecycle (Agile Scrum, waterfall models, software quality metrics).",
          "Web Technologies & APIs (HTTP methods, RESTful architectures, JSON web tokens, CORS setup).",
          "Code Version Control (Git branching, merge conflict resolution, repository workflows)."
        ]
      }
    }
  },
  KPPSC: {
    id: 'KPPSC',
    name: 'KPPSC',
    fullName: 'KP Provincial IT Cadres',
    subName: 'KP Provincial IT Cadres',
    blueprintTitle: 'KPPSC Computer Operator / IT Officer (BS-17) Blueprint',
    specifications: {
      level: "BS-17 KP Cadre",
      questions: "100 Verified MCQs",
      time: "90 Minutes (5,400s)",
      penalty: "-0.25 Per Wrong Answer",
      passing: "45% Passing Standard"
    },
    parts: {
      part1: {
        title: "Part I - English Language & Tense Grammar",
        subtitle: "20% weightage • 20 Questions",
        topics: [
          "Active/Passive voice changes, Direct/Indirect narration conversions.",
          "Common grammatical error identification, spelling tests, and preposition selections."
        ]
      },
      part2: {
        title: "Part II - Quantitative Reasoning & Logic",
        subtitle: "20% weightage • 20 Questions",
        topics: [
          "Logical deduction, blood relations, letter coding series.",
          "Basic percentages, ratios, average profit calculations, and clock mechanics."
        ]
      },
      part3: {
        title: "Part III - IT Infrastructure & Database Management",
        subtitle: "60% weightage • 60 Questions",
        topics: [
          "Windows & Linux Server Administration (Active directory, user permissions, shell scripting, cron jobs).",
          "Hardware Troubleshooting (BIOS configurations, memory swapping diagnostics, RAID arrays).",
          "Database Administration (Data normalization forms 1NF/2NF/3NF, backup recoveries, index setups).",
          "IT Security & Topologies (LAN topologies, standard firewall rules, basic cryptography, phishing defenses)."
        ]
      }
    }
  },
  BPSC: {
    id: 'BPSC',
    name: 'BPSC',
    fullName: 'Balochistan Public Service Commission',
    subName: 'Balochistan Provincial Tech Cadres',
    blueprintTitle: 'BPSC Assistant System Network Administrator (BS-17) Blueprint',
    specifications: {
      level: "BS-17 Balochistan Cadre",
      questions: "100 Verified MCQs",
      time: "90 Minutes (5,400s)",
      penalty: "-0.25 Per Wrong Answer",
      passing: "50% Passing Standard"
    },
    parts: {
      part1: {
        title: "Part I - English Grammar & Verbal Syntax",
        subtitle: "20% weightage • 20 Questions",
        topics: [
          "Word meanings, active vocabulary synonyms, antonym structures.",
          "Subject-verb agreement rules, paragraph summarization, and dangling modifiers."
        ]
      },
      part2: {
        title: "Part II - Pakistan Studies & Islamic Studies",
        subtitle: "20% weightage • 20 Questions",
        topics: [
          "Pakistan Movement history, Balochistan landmarks (Gawadar, Hingol, Quetta administrative codes).",
          "Islamic Jurisprudence basics, Quranic milestones, and Hadith references."
        ]
      },
      part3: {
        title: "Part III - Networking & Systems Administration",
        subtitle: "60% weightage • 60 Questions",
        topics: [
          "Routing Protocols (OSPF routing matrices, BGP path selections, RIP hop constraints).",
          "Subnetting & Addressing (IP Class B structures, Class C custom masking, slash notation /27 /29 allocations).",
          "Network Security & VPNs (IPsec tunnel models, SSL/TLS handshake mechanisms, firewall access control lists).",
          "System Directory Services (Active directory forests, DNS zone transfers, DHCP lease allocations)."
        ]
      }
    }
  }
}
