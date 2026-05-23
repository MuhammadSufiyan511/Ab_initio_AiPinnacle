import { pool, systemPool } from './pool.js'
import dotenv from 'dotenv'

dotenv.config()

const DB_NAME = process.env.DB_NAME || 'ab_initio_lms'

// Complete 200 Question bank
const englishQuestions = [
  ["Synonym for 'Eleemosynary':", ["Charitable", "Complicated", "Deceitful", "Ancient"], 0, "Relates to charity."],
  ["Error: 'Were he to understand the code, he would not have deleted it.'", ["Were he to", "understand the code", "would not have", "deleted it"], 2, "Mixed conditional. Should be 'would not delete it'."],
  ["Antonym for 'Lugubrious':", ["Mournful", "Cheerful", "Clumsy", "Heavy"], 1, "Lugubrious means sad; Cheerful is opposite."],
  ["Idiom 'Sword of Damocles':", ["A weapon of great power", "An imminent, ever-present threat", "A decisive action", "A victory that costs too much"], 1, "An imminent, ever-present threat."],
  ["Preposition: 'Impervious ___ modern optimizations.'", ["against", "to", "for", "from"], 1, "Impervious is followed by 'to'."],
  ["Subjunctive use:", ["I insist that the developer tests the module.", "I insist that the developer test the module.", "I insist that the developer will test the module.", "I insist the developer testing the module."], 1, "Subjunctive uses base form 'test'."],
  ["Complete: 'Not only ___ the database crash, but backups corrupted.'", ["did", "has", "had", "does"], 0, "Inversion required: 'Not only did...'"],
  ["Correct spelling:", ["Surrepticious", "Surreptitious", "Surreptitios", "Surreptishious"], 1, "Surreptitious (kept secret)."],
  ["Synonym for 'Sycophancy':", ["Flattery", "Rebellion", "Ignorance", "Transparency"], 0, "Obsequious behavior; flattery."],
  ["Analogy LION : PRIDE ::", ["Dog : Pack", "Bird : Flock", "Fish : School", "All of the above"], 3, "All are correct animal group names."],
  ["Complete: 'She is one of the few engineers who ___ mastered Kubernetes.'", ["has", "have", "is having", "having"], 1, "Relative pronoun 'who' refers to plural 'engineers', so 'have'."],
  ["Antonym for 'Enervate':", ["Exhaust", "Invigorate", "Confuse", "Determine"], 1, "Enervate means to drain energy; Invigorate means to give energy."],
  ["Dangling modifier:", ["Having compiled successfully, the developer pushed the code.", "The developer pushed the code after compiling it.", "Having compiled successfully, the code was pushed.", "After successful compilation, the code was pushed."], 0, "Implies the developer compiled, not the code."],
  ["Idiom 'To tilt at windmills':", ["To cut down trees", "To waste time on an imaginary enemy", "To attack an ally", "To build infrastructure"], 1, "Pursuing an impossible task."],
  ["Preposition: 'Absolved ___ all responsibility.'", ["from", "of", "for", "with"], 1, "Absolve takes 'of'."],
  ["Synonym for 'Mellifluous':", ["Stagnant", "Harsh", "Harmonious", "Complex"], 2, "Sweet or musical; harmonious."],
  ["Correct spelling:", ["Bellweather", "Bellwether", "Bellewether", "Belweather"], 1, "Bellwether (a trendsetter)."],
  ["Passive voice: 'They are building a new data center.'", ["A new data center is being built.", "A new data center was being built.", "A new data center has been built.", "A new data center is built."], 0, "Present continuous becomes 'is being built'."],
  ["Error: 'The criteria for selecting the best candidate is highly rigorous.'", ["The criteria", "for selecting", "is", "highly rigorous"], 2, "Criteria is plural; verb must be 'are'."],
  ["Antonym for 'Obfuscate':", ["Clarify", "Confuse", "Bury", "Intensify"], 0, "Obfuscate means to obscure; Clarify is opposite."],
  ["Meaning of 'Mutatis mutandis':", ["With the necessary changes having been made", "In equal fault", "From the beginning", "By the fact itself"], 0, "Latin for 'necessary changes made'."],
  ["Correct sentence:", ["Each of the nodes are failing.", "Each of the nodes is failing.", "Each of the node is failing.", "Each nodes are failing."], 1, "'Each of' takes a plural noun but singular verb."],
  ["Meaning of 'Pernicious':", ["Helpful", "Harmless", "Gradually harmful", "Loud"], 2, "Having a harmful effect in a gradual way."],
  ["Synonym for 'Ephemeral':", ["Enduring", "Transient", "Pervasive", "Robust"], 1, "Lasting for a very short time."],
  ["Idiom 'To cross the Rubicon':", ["To pass a point of no return", "To sign a peace treaty", "To build a bridge", "To forgive an enemy"], 0, "To make an irrevocable decision."],
  ["Synonym for 'Abate':", ["Intensify", "Subside", "Prolong", "Instigate"], 1, "To become less intense."],
  ["Antonym for 'Cacophony':", ["Noise", "Harmony", "Dissonance", "Clamor"], 1, "Cacophony is harsh sound; harmony is opposite."],
  ["Correct spelling:", ["Occassion", "Occasion", "Ocassion", "Occcasion"], 1, "Occasion has two C's, one S."],
  ["Idiom 'A blessing in disguise':", ["A hidden curse", "Something good not recognized at first", "A blatant lie", "An obvious advantage"], 1, "Good result from apparent misfortune."],
  ["Preposition: 'He insisted ___ paying for the meal.'", ["on", "for", "in", "about"], 0, "Insist is followed by 'on'."],
  ["Sentence completion: 'The bouquet of red roses ___ beautiful.'", ["are", "were", "is", "have been"], 2, "Subject 'bouquet' is singular."],
  ["Analogy SURGEON : SCALPEL ::", ["Carpenter : Wood", "Author : Book", "Tailor : Needle", "Chef : Recipe"], 2, "Primary tool analogy."],
  ["Error identification: 'She does not knows how to swim.'", ["She", "does not", "knows", "how to swim"], 2, "Base verb 'know' must follow 'does not'."],
  ["Synonym for 'Lucid':", ["Confusing", "Clear", "Dark", "Heavy"], 1, "Expressed clearly."],
  ["Antonym for 'Frugal':", ["Thrifty", "Economical", "Extravagant", "Miserly"], 2, "Frugal is sparing; Extravagant is reckless."],
  ["Correct sentence:", ["He gave me an advice.", "He gave me some advices.", "He gave me a piece of advice.", "He give me an advice."], 2, "Advice is uncountable."],
  ["Idiom 'To let the cat out of the bag':", ["To adopt a pet", "To reveal a secret", "To misplace something", "To get angry"], 1, "Reveal a secret accidentally."],
  ["Preposition: 'She is completely absorbed ___ her work.'", ["in", "with", "by", "into"], 0, "Absorbed 'in' something."],
  ["Synonym for 'Tenacious':", ["Weak", "Yielding", "Persistent", "Fragile"], 2, "Keeping a firm hold."],
  ["Correct spelling:", ["Fascinate", "Fassinate", "Facinate", "Fasinate"], 0, "Fascinate."],
  ["Change to passive: 'The chef cooked the meal.'", ["The meal was cooked by the chef.", "The meal cooked the chef.", "The chef is cooking the meal.", "The meal had been cooked."], 0, "Object becomes subject."],
  ["Antonym for 'Ameliorate':", ["Improve", "Worsen", "Amend", "Relieve"], 1, "Ameliorate means improve; Worsen is opposite."],
  ["Analogy WATER : THIRST ::", ["Food : Hunger", "Sleep : Bed", "Fire : Heat", "Book : Knowledge"], 0, "Water quenches thirst; food satisfies hunger."],
  ["Error: 'Between you and I, he is wrong.'", ["Between", "you and I", "he is", "wrong"], 1, "Prepositions take objective pronouns: 'you and me'."],
  ["Meaning of 'Vindicate':", ["To accuse", "To clear from blame", "To punish", "To demand"], 1, "To clear from blame or suspicion."],
  ["Sentence completion: 'Neither the teacher nor the students ___ present.'", ["was", "were", "is", "has been"], 1, "Verb agrees with closer subject (students)."],
  ["Idiom 'Hit the nail on the head':", ["Get a headache", "Do exactly right", "Make a mistake", "Work as a carpenter"], 1, "Do or say something exactly right."],
  ["Synonym for 'Candid':", ["Deceitful", "Frank", "Shy", "Reserved"], 1, "Truthful and straightforward."],
  ["Preposition: 'We should comply ___ the rules.'", ["by", "to", "with", "in"], 2, "Comply 'with'."],
  ["Correct spelling:", ["Privelege", "Privilege", "Priviledge", "Privelige"], 1, "Privilege has no D."]
]

const generalQuestions = [
  ["Remainder when 3^200 is divided by 7?", ["1", "2", "4", "5"], 1, "3^6 = 1 mod 7. 200 = 6*33 + 2. Remainder is same as 3^2 mod 7 = 2."],
  ["Clock gains 5 mins every hour. Set at 12:00 PM, true time when clock shows 6:30 PM?", ["5:30 PM", "5:45 PM", "6:00 PM", "6:15 PM"], 2, "390 broken mins = 360 real mins = 6:00 PM."],
  ["If log_x(16) = 4, x is?", ["2", "4", "8", "16"], 0, "x^4 = 16. The 4th root of 16 is 2."],
  ["1973 Constitution Article for Vote of No-Confidence against PM?", ["Article 58", "Article 95", "Article 112", "Article 245"], 1, "Article 95 deals with No-Confidence against the PM."],
  ["Mountain pass connecting Chitral with Wakhan?", ["Khyber Pass", "Bolan Pass", "Broghil Pass", "Khunjerab Pass"], 2, "Broghil Pass connects Chitral and Wakhan."],
  ["Derivative of f(x) = e^(2x)?", ["e^(2x)", "2e^(2x)", "xe^(2x)", "e^x"], 1, "Chain rule yields 2e^(2x)."],
  ["Train 200m long passes pole in 10s, platform in 25s. Platform length?", ["200m", "250m", "300m", "350m"], 2, "Speed = 20m/s. Platform time = 15s. Length = 300m."],
  ["Treaty Pakistan signed in 2024 to regulate AI?", ["Bletchley Declaration", "Kyoto Protocol", "Geneva Convention", "Rome Statute"], 0, "Bletchley Declaration on AI safety."],
  ["'REST' stands for?", ["Remote Execution Standard", "Representational State Transfer", "Reliable Enterprise System", "Redundant Environment State"], 1, "Representational State Transfer."],
  ["Largest earth-filled dam in the world?", ["Mangla Dam", "Tarbela Dam", "Aswan Dam", "Hoover Dam"], 1, "Tarbela Dam in Pakistan."],
  ["A works in 10 days, B in 15 days. Together?", ["5 days", "6 days", "8 days", "12 days"], 1, "1/10 + 1/15 = 1/6. Takes 6 days."],
  ["Architect of the 1956 Constitution of Pakistan?", ["Liaquat Ali Khan", "Chaudhry Muhammad Ali", "Iskander Mirza", "Ayub Khan"], 1, "PM Chaudhry Muhammad Ali."],
  ["Integral of 1/x dx:", ["x^2", "1/x^2", "ln(x)", "e^x"], 2, "Indefinite integral of 1/x is ln(x) + C."],
  ["SCO summit 2024 hosted in?", ["Astana", "Beijing", "Islamabad", "Moscow"], 0, "Hosted in Astana, Kazakhstan."],
  ["Hemisphere volume = 18π. Radius?", ["2", "3", "4", "6"], 1, "(2/3)πr^3 = 18π -> r^3 = 27 -> r=3."],
  ["When was 18th Amendment passed?", ["2008", "2010", "2012", "2015"], 1, "April 2010."],
  ["Missing number: 2, 6, 21, 88, ___?", ["345", "445", "450", "460"], 1, "(x * mult) + mult. 88*5 + 5 = 445."],
  ["MAC stands for?", ["Media Access Control", "Machine Access Code", "Multiple Access Center", "Memory Cache"], 0, "Media Access Control."],
  ["Amendment merging FATA with KP?", ["21st", "24th", "25th", "26th"], 2, "25th Amendment (2018)."],
  ["Petrol price up 25%. Consumption reduction to keep expenses same?", ["20%", "25%", "15%", "10%"], 0, "Reduction = 25/125 = 20%."],
  ["Current Secretary General of OIC?", ["Hissein Brahim Taha", "Yousef Al-Othaimeen", "Iyad Madani", "Ekmeleddin Ihsanoglu"], 0, "Hissein Brahim Taha (2021-present)."],
  ["Malware disguised as legitimate software?", ["Worm", "Ransomware", "Trojan Horse", "Spyware"], 2, "Trojan Horse."],
  ["Desert in Balochistan?", ["Thar", "Cholistan", "Thal", "Kharan"], 3, "Kharan Desert."],
  ["Buy Rs 1500, sell Rs 1800. Profit %?", ["15%", "20%", "25%", "30%"], 1, "Profit = 300. (300/1500)*100 = 20%."],
  ["Article defining State religion as Islam?", ["Article 1", "Article 2", "Article 3", "Article 4"], 1, "Article 2 of 1973 Constitution."],
  ["20% of 80 is:", ["12", "14", "16", "18"], 2, "0.2 * 80 = 16."],
  ["Ratio boys to girls 4:5. Total 45. Boys?", ["20", "25", "16", "30"], 0, "9 parts total. 1 part = 5. Boys = 20."],
  ["Speed 90 km/h in m/s?", ["20", "25", "30", "35"], 1, "90 * (5/18) = 25 m/s."],
  ["Next number: 3, 7, 15, 31, ___?", ["63", "60", "61", "65"], 0, "(31 * 2) + 1 = 63."],
  ["Average of 2, 4, 6, 8, 10?", ["4", "5", "6", "8"], 2, "Sum is 30. Average is 6."],
  ["2026 FIFA World Cup hosts?", ["Brazil & Argentina", "Qatar & UAE", "US, Canada, & Mexico", "Germany & France"], 2, "North American countries."],
  ["First President of Pakistan?", ["Quaid-e-Azam", "Liaquat Ali Khan", "Iskander Mirza", "Ayub Khan"], 2, "Iskander Mirza (1956)."],
  ["Mohenjo-Daro is in?", ["Punjab", "Sindh", "Balochistan", "KPK"], 1, "Sindh province."],
  ["Formula for Ozone?", ["O2", "O3", "CO2", "H2O"], 1, "Ozone is O3."],
  ["Plants absorb what gas?", ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 1, "Absorb CO2 during photosynthesis."],
  ["HTTP stands for?", ["Hypertext Transfer Protocol", "Hyper Transfer Text", "Hypertext Transmission", "Hyperlink Transfer"], 0, "Hypertext Transfer Protocol."],
  ["RAM stands for?", ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Rapid Access"], 1, "Random Access Memory."],
  ["Gwadar Port is in?", ["Sindh", "Punjab", "Balochistan", "KPK"], 2, "Balochistan province."],
  ["Server processes 300 req in 5 mins. How many in 75 mins?", ["3000", "4500", "4000", "5000"], 1, "60/min * 75 = 4500."],
  ["Probability of 2 independent systems failing (P=0.05)?", ["0.10", "0.025", "0.0025", "0.05"], 2, "0.05 * 0.05 = 0.0025."],
  ["Laptop depreciates 10% yearly. Current Rs 81,000. Value a year ago?", ["89,100", "90,000", "91,000", "100,000"], 1, "81000 / 0.9 = 90,000."],
  ["Minimum age for President in 1973 Const?", ["35", "40", "45", "50"], 2, "45 years."],
  ["Next term: 1, 8, 27, 64, 125, ___?", ["144", "196", "216", "256"], 2, "6^3 = 216."],
  ["G20 presidency in 2024?", ["India", "Brazil", "South Africa", "Indonesia"], 1, "Brazil."],
  ["Average of 5 consecutive even numbers is 24. Largest?", ["26", "28", "30", "32"], 1, "Numbers: 20, 22, 24, 26, 28."],
  ["Durand Line borders Pakistan and:", ["India", "Iran", "China", "Afghanistan"], 3, "Afghanistan."],
  ["If day after tomorrow is Friday, what was 3 days before yesterday?", ["Sunday", "Monday", "Saturday", "Friday"], 2, "Today is Wed. Yesterday Tue. 3 days before Tue is Saturday."],
  ["Mountain range in South Pakistan?", ["Karakoram", "Himalayas", "Hindu Kush", "Kirthar"], 3, "Kirthar Mountains."],
  ["Smallest ocean in the world?", ["Indian", "Southern", "Arctic", "Atlantic"], 2, "Arctic Ocean."],
  ["Average of first 5 prime numbers?", ["5.6", "3.6", "4.0", "5.0"], 0, "(2+3+5+7+11)/5 = 28/5 = 5.6."]
]

const professionalQuestions = [
  ["In Tomasulo's algorithm, what eliminates WAW and WAR hazards?", ["ROB", "Reservation Stations", "Branch Target Buffer", "TLB"], 1, "Reservation Stations hold operands and allow register renaming."],
  ["Which cache mapping scheme strictly uses a replacement algorithm?", ["Direct Mapped", "Fully Associative", "Write-Through", "Write-Back"], 1, "Direct mapped has only one possible block location. Associative needs LRU."],
  ["In OS, what is the 'Working Set'?", ["Total RAM", "Set of pages actively referenced", "Page table size", "Swap space"], 1, "Estimates memory required by a process to prevent thrashing."],
  ["Tag, index, offset for 32-bit addr, 64KB Direct Mapped, 16-byte blocks.", ["T=16, I=12, O=4", "T=14, I=14, O=4", "T=12, I=16, O=4", "T=20, I=8, O=4"], 0, "Blocks=4096. I=12. O=4. T = 32-12-4 = 16."],
  ["Deadlock tool for MULTIPLE instances of resources?", ["Wait-For Graph", "Resource Allocation Graph", "Banker's Matrix", "Ostrich"], 2, "Multiple-instance requires matrices (Banker's)."],
  ["Function of a 'Microkernel'?", ["All OS in kernel", "Keep essential services in kernel, drivers in user space", "Remove kernel", "Virtualize"], 1, "Improves stability by running most services in user-space."],
  ["Pipeline delays: 5ns, 7ns, 4ns, 9ns, 6ns. Clock cycle time?", ["9 ns", "5 ns", "31 ns", "6.2 ns"], 0, "Dictated by the slowest stage (9ns)."],
  ["In Linux, parent terminates before child. Child is?", ["Zombie", "Killed", "Adopted by init", "Panic"], 2, "Orphans adopted by PID 1 to prevent zombies."],
  ["Amdahl's Law max speedup if 50% code is sequential?", ["2x", "4x", "10x", "Infinite"], 0, "1 / 0.5 = 2x max speedup."],
  ["Priority Inversion is:", ["High yields to low", "Low priority holds lock needed by high", "Same priority", "Random"], 1, "Low-priority task blocks high-priority task holding a mutex."],
  ["Memory anomaly associated with FIFO?", ["Thrashing", "Belady's Anomaly", "Fragmentation", "Paging"], 1, "Adding more page frames can cause MORE page faults."],
  ["Scheduling algorithm with minimum average waiting time?", ["FCFS", "Round Robin", "SJF", "Priority"], 2, "Shortest Job First (SJF) is mathematically optimal."],
  ["What does 'fork()' do in Unix?", ["Deletes file", "Creates thread", "Creates child process", "Terminates"], 2, "Creates independent child process."],
  ["What causes a 'Control Hazard'?", ["Memory conflict", "Branch instructions", "Lack of cache", "Division by zero"], 1, "Branch instructions cause wrong address fetch."],
  ["Metric improved by 'Superscalar' architecture?", ["Clock freq", "ILP (Instruction Level Parallelism)", "Cache", "Seek time"], 1, "Issues multiple instructions per clock."],
  ["Role of 'Interrupt Controller'?", ["Stop network", "Prioritize hardware signals to CPU", "Power", "Format drives"], 1, "Handles IRQs from peripherals."],
  ["Coffman condition requiring voluntary release?", ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"], 2, "No Preemption means OS cannot force release."],
  ["What is 'Thrashing'?", ["High temp", "Excessive page swapping", "Deadlock", "Network collision"], 1, "OS spends more time swapping than executing."],
  ["Scheduling algorithm that CANNOT cause starvation?", ["SJF", "Priority", "Round Robin", "SRTF"], 2, "Round Robin guarantees CPU time slice."],
  ["TLB stands for?", ["Translation Lookaside Buffer", "Table Look Buffer", "Time Limit Band", "Task Logic Block"], 0, "Caches virtual-to-physical translations."],
  ["Difference between CISC and RISC?", ["RISC uses cache", "RISC allows memory ops", "CISC allows ops on memory; RISC uses load/store", "None"], 2, "CISC operates directly on memory."],
  ["Write-Back cache policy?", ["Simultaneous write", "Written to memory only on eviction", "Bypass cache", "Queued"], 1, "Modified block written to memory only when evicted."],
  ["DMA (Direct Memory Access) accomplishes:", ["Faster CPU", "I/O accesses memory without CPU", "No fragmentation", "Compression"], 1, "Offloads memory transfers from CPU."],
  ["Context Switch is:", ["Switching monitors", "Saving old process state, loading new", "Changing kernel", "User to kernel"], 1, "Storing CPU state for one process and restoring for another."],
  ["Zombie Process is:", ["Consumes RAM", "Terminated but in process table", "Virus", "Infinite loop"], 1, "Finished execution but not reaped by parent."],
  ["Race Condition:", ["High clock speed", "Processes execute out of order causing unpredictable results", "No memory", "Routing issue"], 1, "Timing/order affects output correctness."],
  ["In OS, what is 'Spooling'?", ["Simultaneous Peripheral Operations On-Line", "System Protocol", "Synchronous Process", "Single Peripheral"], 0, "Buffers data for peripherals like printers."],
  ["System call to create new process in Unix?", ["exec()", "spawn()", "create()", "fork()"], 3, "fork() duplicates calling process."],
  ["Difference between Mutex and Semaphore?", ["Mutex is int, Sem is bool", "Mutex allows multiple", "Mutex has ownership, Semaphore does not", "No difference"], 2, "Mutex is a locking mechanism with ownership."],
  ["Working Set Model prevents:", ["Fragmentation", "Thrashing", "Deadlocks", "Access"], 1, "Keeps track of active pages to prevent thrashing."],
  ["C++ exception if `dynamic_cast` fails on REFERENCE?", ["bad_alloc", "bad_cast", "exception", "Nullptr"], 1, "Throws `std::bad_cast`."],
  ["Dependency Inversion Principle states:", ["High-level shouldn't depend on low-level", "Single responsibility", "Inheritance over composition", "Segregate interfaces"], 0, "Details should depend on abstractions."],
  ["Cyclomatic Complexity formula:", ["E+N-2P", "E-N+2P", "N-E+P", "E/N+2P"], 1, "V(G) = E - N + 2P."],
  ["Pattern defining family of interchangeable algorithms?", ["Factory", "Decorator", "Strategy", "Singleton"], 2, "Strategy encapsulates interchangeable algorithms."],
  ["`static_cast` vs `reinterpret_cast`?", ["Runtime vs no check", "Safe conversions vs low-level bitwise casting", "Upcast only", "Identical"], 1, "reinterpret_cast does unsafe bitwise casting."],
  ["'volatile' keyword in C++ signifies:", ["Variable modified externally; don't optimize reads", "Constant", "Virtual table", "Thread-safe"], 0, "Tells compiler not to optimize memory reads."],
  ["What is 'Stamp Coupling'?", ["Global vars", "Control flag", "Share composite data structure, use only part", "Modify code"], 2, "Passing a whole object when only a single field is needed."],
  ["Scrum metric for work tackled during Sprint?", ["Capacity", "Velocity", "Throughput", "Burn-down"], 1, "Velocity adds story points of completed items."],
  ["Destructor execution order in derived classes?", ["Base first", "Derived first, then base", "Simultaneous", "Only derived"], 1, "Derived-to-base."],
  ["'Virtual Table' (vtable) is used for?", ["Garbage collection", "Resolving dynamic polymorphism", "Multiple inheritance", "Templates"], 1, "Lookup table for dynamic method resolution."],
  ["Polymorphism is:", ["Hiding data", "Multiple parents", "Objects responding to same method differently", "Cross-platform"], 2, "Methods do different things based on object."],
  ["Pure Virtual Function in C++?", ["No return type", "Defined as '= 0', makes class abstract", "Constant time", "Base only"], 1, "Forces derived classes to implement it."],
  ["SOLID principle: class should have one reason to change?", ["SRP", "OCP", "LSP", "DIP"], 0, "Single Responsibility Principle."],
  ["Memory allocation for 'new' keyword?", ["Stack", "Heap", "BSS", "Data"], 1, "Dynamic allocation on Heap."],
  ["Tight Coupling is:", ["Speed", "Modules highly dependent on each other", "Single responsibility", "Network"], 1, "Makes code hard to maintain."],
  ["Who manages Product Backlog in Scrum?", ["Scrum Master", "Dev Team", "Product Owner", "Stakeholders"], 2, "Product Owner prioritizes backlog."],
  ["White Box Testing is:", ["UI testing", "No internal knowledge", "Testing based on internal logic", "Security only"], 2, "Inspect and execute internal code paths."],
  ["UML diagram showing lifecycle of a single object?", ["Activity", "State Machine", "Component", "Deployment"], 1, "Shows states an object goes through."],
  ["Model based on prototyping and rapid feedback?", ["Waterfall", "V-Model", "RAD", "Cleanroom"], 2, "Rapid Application Development."],
  ["Facade design pattern does what?", ["Creates objects", "Provides simplified interface to complex subsystem", "Single instance", "State change"], 1, "Acts as a wrapper hiding complexity."],
  ["Liskov Substitution Principle states:", ["One reason", "Depend on abstractions", "Derived substitutable for base", "Segregate"], 2, "Objects of superclass replaceable with subclasses."],
  ["Model explicitly incorporating risk analysis?", ["Waterfall", "V-Model", "Spiral Model", "RAD"], 2, "Spiral emphasizes risk assessment."],
  ["UML 'Sequence Diagram' is:", ["Structural", "Behavioral / Interaction", "Implementation", "Deployment"], 1, "Models flow of messages over time."],
  ["Verification vs Validation?", ["Same", "Verify: built right; Validate: built right thing", "Users vs Devs", "Hardware vs Software"], 1, "Verify against specs; Validate against user needs."],
  ["CMMI Level 3 (Defined) means:", ["Unpredictable", "Project level", "Standardized across organization", "Quantitative"], 2, "Processes well characterized and standardized."],
  ["Abstract Class vs Interface (General OOP)?", ["Interface has vars", "Abstract class can have implemented methods, pure interface cannot", "Multiple inherit", "Static only"], 1, "Abstract classes can provide default implementations."],
  ["What does 'protected' modifier do?", ["Same class", "Subclasses and friends", "Global", "Static"], 1, "Accessible within class and derived classes."],
  ["'Diamond Problem' resolved by:", ["Smart pointers", "'virtual' inheritance", "DFS", "Pure functions"], 1, "Ensures only one copy of base class instantiated."],
  ["Constructor invoked when object passed by value?", ["Default", "Parametrized", "Copy", "Move"], 2, "Creates a temporary copy."],
  ["'Upcasting' is:", ["Base to derived pointer", "Derived to base pointer", "Int to float", "Override abstract"], 1, "Converting derived-class pointer to base-class pointer."],
  ["Amortized time of inserting into dynamic array (doubles when full)?", ["O(n)", "O(n^2)", "O(1)", "O(log n)"], 2, "Amortized time is O(1)."],
  ["AVL Tree: insertion in Left child of Right subtree requires?", ["Single Left", "Single Right", "Right-Left", "Left-Right"], 2, "Right rotation on child, Left rotation on parent."],
  ["Graph algorithm using 'Relaxation' detecting negative cycles?", ["Dijkstra's", "Kruskal's", "Bellman-Ford", "Tarjan's"], 2, "Bellman-Ford relaxes edges V-1 times."],
  ["BCNF states for functional dependency X -> Y:", ["Y is prime", "X is superkey", "X is foreign key", "No multi-valued"], 1, "Determinant (X) must be a super key."],
  ["Strict 2PL vs Rigorous 2PL?", ["Strict releases shared anytime, Rigorous holds ALL locks until commit", "Strict prevents deadlocks", "Strict for distributed", "No diff"], 0, "Rigorous 2PL holds read and write locks until termination."],
  ["BGP path attribute preventing routing loops?", ["MED", "Local Preference", "AS-PATH", "Next-Hop"], 2, "Lists autonomous systems to detect loops."],
  ["Subnet ID for IP 192.168.1.130/29?", ["192.168.1.128", "192.168.1.130", "192.168.1.135", "192.168.1.0"], 0, "Block size 8. Nearest multiple below 130 is 128."],
  ["TCP 'Fast Retransmit' mechanism?", ["No handshake", "Retransmit after 3 duplicate ACKs", "Use UDP", "Increase window"], 1, "Avoids waiting for timeout."],
  ["Kosaraju's algorithm uses what structure?", ["Queue", "Hash Map", "Stack", "BST"], 2, "Relies on a Stack (via DFS) for completion times."],
  ["IPv6 address field length?", ["32", "64", "128", "256"], 2, "128 bits long."],
  ["Isolation level solving 'Phantom Read'?", ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], 3, "Serializable prevents phantom reads."],
  ["Key structural difference of B+ Tree?", ["Unbalanced", "Data exclusively in linked leaf nodes", "2 children", "Data in root"], 1, "Optimizes sequential/range queries."],
  ["Time complexity to 'Heapify' array (bottom-up)?", ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"], 1, "Tightly bounds to O(n) time."],
  ["'Conflict Serializable' schedule means:", ["Equivalent to serial", "Precedence graph is acyclic", "Both A and B", "No deadlocks"], 2, "Graph is acyclic, equivalent to serial execution."],
  ["Hidden Node Problem in CSMA/CA?", ["Router dies", "Nodes communicate with AP, but cannot hear each other", "SSID hidden", "Encryption fails"], 1, "Mitigated by RTS/CTS handshakes."],
  ["Ostrich Algorithm in OS?", ["Bird scheduling", "Ignoring deadlocks because they are rare", "Fast disk", "Cache eviction"], 1, "Ignoring exceedingly rare problems."],
  ["`std::move` in C++ does what?", ["Moves memory", "Copies faster", "Casts to rvalue reference", "Deletes object"], 2, "Enables move semantics."],
  ["Which sort is NOT in-place?", ["Heap Sort", "Quick Sort", "Insertion Sort", "Merge Sort"], 3, "Merge Sort requires O(n) auxiliary space."],
  ["Max edges in simple, undirected graph with N vertices?", ["N^2", "N(N-1)/2", "N-1", "N!"], 1, "N * (N-1) / 2."],
  ["IPsec operates at which OSI layer?", ["Application", "Transport", "Network", "Data Link"], 2, "Secures IP at Network Layer (Layer 3)."],
  ["Data structure for BFS?", ["Stack", "Array", "Queue", "Heap"], 2, "Explores level by level using a Queue."],
  ["Worst-case time of unbalanced BST lookup?", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 2, "Degrades to linked list, O(n)."],
  ["Sort guaranteed O(n log n)?", ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], 1, "Merge sort divides and merges."],
  ["Dijkstra's algorithm finds:", ["MST", "Max Flow", "Single-source shortest path", "SCCs"], 2, "Shortest path from start node to all others."],
  ["Hash Table collision resolution (next empty slot):", ["Chaining", "Linear Probing", "Double Hashing", "Quadratic Probing"], 1, "Linear probing steps sequentially."],
  ["3NF requires no:", ["Primary keys", "Partial dependencies", "Transitive dependencies", "Multi-valued attributes"], 2, "Eliminates transitive dependencies."],
  ["Durability in ACID guarantees:", ["Speed", "Committed transactions survive crashes", "No deletion", "No interference"], 1, "Saved permanently even on power loss."],
  ["Lock allowing reads but blocking writes?", ["Exclusive", "Update", "Shared", "Intent"], 2, "Shared Lock."],
  ["SQL command to modify table schema?", ["UPDATE", "INSERT", "ALTER", "MODIFY"], 2, "ALTER TABLE."],
  ["What is a 'Foreign Key'?", ["Encryption key", "Links to primary key of another table", "Allows nulls", "Auto-generated"], 1, "Establishes relationship between tables."],
  ["OSI layer for IP?", ["Data Link", "Network", "Transport", "Session"], 1, "Network Layer (Layer 3)."],
  ["Protocol resolving IP to MAC?", ["DNS", "DHCP", "ARP", "ICMP"], 2, "Address Resolution Protocol."],
  ["Default subnet mask for Class B?", ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], 1, "255.255.0.0."],
  ["Connectionless transport protocol?", ["TCP", "HTTP", "UDP", "FTP"], 2, "UDP is connectionless, no delivery guarantee."],
  ["Topology connecting every node to every other node?", ["Star", "Bus", "Ring", "Full Mesh"], 3, "Full Mesh."],
  ["Presentation Layer handles:", ["Routing", "Encryption/Compression", "MAC addresses", "Port numbers"], 1, "Data representation, encryption, compression."],
  ["TCP is known as:", ["Connectionless", "Connection-oriented", "Unreliable", "Broadcast"], 1, "Requires handshake."],
  ["Standard port for HTTPS?", ["21", "25", "80", "443"], 3, "Port 443."],
  ["Usable hosts in a /28 CIDR block?", ["14", "16", "30", "32"], 0, "2^4 - 2 = 14."],
  ["Protocol using 'Distance Vector' routing?", ["OSPF", "RIP", "BGP", "IS-IS"], 1, "Routing Information Protocol (RIP)."]
]

// Schema definitions
const CREATE_TABLES = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Safely add columns if they don't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;

CREATE TABLE IF NOT EXISTS exams (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  case_no VARCHAR(255),
  duration INTEGER NOT NULL,
  passing_score DOUBLE PRECISION DEFAULT 50.0,
  logo_url VARCHAR(255),
  negative_marking DOUBLE PRECISION DEFAULT 0.25
);

ALTER TABLE exams ADD COLUMN IF NOT EXISTS logo_url VARCHAR(255);
ALTER TABLE exams ADD COLUMN IF NOT EXISTS negative_marking DOUBLE PRECISION DEFAULT 0.25;

CREATE TABLE IF NOT EXISTS exam_sections (
  id VARCHAR(255) PRIMARY KEY,
  exam_id VARCHAR(255) REFERENCES exams(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  section_id VARCHAR(255) REFERENCES exam_sections(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer_index INTEGER NOT NULL,
  explanation TEXT
);

CREATE TABLE IF NOT EXISTS user_exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_id VARCHAR(255) REFERENCES exams(id) ON DELETE CASCADE,
  score DOUBLE PRECISION,
  correct_answers INTEGER DEFAULT 0,
  wrong_answers INTEGER DEFAULT 0,
  skipped_answers INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  remaining_time INTEGER,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attempt_answers (
  attempt_id UUID REFERENCES user_exam_attempts(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  PRIMARY KEY (attempt_id, question_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_exam_sections_exam_id ON exam_sections(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_section_id ON questions(section_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_id ON user_exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_exam_id ON user_exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt_id ON attempt_answers(attempt_id);
`

export async function initDb(): Promise<void> {
  console.log('Initializing database setup...')

  try {
    // 1. Check if database exists, create if not
    const dbCheck = await systemPool.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME])
    if (dbCheck.rowCount === 0) {
      console.log(`Database '${DB_NAME}' does not exist. Creating...`)
      await systemPool.query(`CREATE DATABASE ${DB_NAME}`)
      console.log(`Database '${DB_NAME}' created successfully.`)
    }

    // 2. Create tables
    console.log('Creating tables...')
    await pool.query(CREATE_TABLES)

    // 2b. Repair legacy schema mismatch where user_exam_attempts.user_id was INTEGER
    const fkTypeCheck = await pool.query(`
      SELECT
        (SELECT data_type FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'id') AS users_id_type,
        (SELECT data_type FROM information_schema.columns WHERE table_name = 'user_exam_attempts' AND column_name = 'user_id') AS attempts_user_id_type
    `)
    const usersIdType = fkTypeCheck.rows[0]?.users_id_type
    const attemptsUserIdType = fkTypeCheck.rows[0]?.attempts_user_id_type

    if (usersIdType && attemptsUserIdType && usersIdType !== attemptsUserIdType) {
      console.warn(
        `Schema mismatch detected: users.id=${usersIdType}, user_exam_attempts.user_id=${attemptsUserIdType}. Rebuilding attempt tables...`
      )

      await pool.query(`
        DROP TABLE IF EXISTS attempt_answers;
        DROP TABLE IF EXISTS user_exam_attempts;

        CREATE TABLE user_exam_attempts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          exam_id VARCHAR(255) REFERENCES exams(id) ON DELETE CASCADE,
          score DOUBLE PRECISION,
          correct_answers INTEGER DEFAULT 0,
          wrong_answers INTEGER DEFAULT 0,
          skipped_answers INTEGER DEFAULT 0,
          time_spent INTEGER DEFAULT 0,
          remaining_time INTEGER,
          is_completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          completed_at TIMESTAMP
        );

        CREATE TABLE attempt_answers (
          attempt_id UUID REFERENCES user_exam_attempts(id) ON DELETE CASCADE,
          question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
          selected_option_index INTEGER NOT NULL,
          is_correct BOOLEAN NOT NULL,
          PRIMARY KEY (attempt_id, question_id)
        );
      `)
    }

    console.log('Tables verified/created successfully. Seeding initial data...')

    // 3. Seed active mock exams
    const examsToSeed = [
      {
        id: 'fpsc-system-analyst',
        title: 'System Analyst Proctored Simulation',
        category: 'FPSC',
        course: 'System Analyst (BS-18)',
        case_no: 'Case No. F.4-74/2026-R',
        duration: 12000,
        passing_score: 40.0,
        logo_url: 'fpsc',
        negative_marking: 0.25,
        sections: [
          { id: 'part-i', name: 'Part I - English (Grammar & Vocabulary)' },
          { id: 'part-ii-gi', name: 'Part II - General Intelligence (Arithmetic & General Knowledge)' },
          { id: 'part-iii-cs', name: 'Part III - Professional IT (Computer Science & SE)' }
        ]
      },
      {
        id: 'ppsc-it-officer',
        title: 'PPSC IT Officer Proctored Simulation',
        category: 'PPSC',
        course: 'IT Officer (BS-17)',
        case_no: 'Case No. 12-RG/2026',
        duration: 5400,
        passing_score: 50.0,
        logo_url: 'ppsc',
        negative_marking: 0.25,
        sections: [
          { id: 'ppsc-part-i', name: 'Part I - IT Core' },
          { id: 'ppsc-part-ii', name: 'Part II - Pakistan Studies & GK' }
        ],
        questions: [
          ["Which layer of the OSI model does a router operate on?", ["Physical", "Data Link", "Network", "Transport"], 2, "Routers operate at the Network layer (Layer 3).", 'ppsc-part-i'],
          ["What is the main function of Address Resolution Protocol (ARP)?", ["Map IP to MAC address", "Map Domain to IP", "Establish secure connection", "Manage files"], 0, "ARP resolves IP addresses to physical MAC addresses.", 'ppsc-part-i'],
          ["Who was the first Prime Minister of Pakistan?", ["Muhammad Ali Jinnah", "Liaquat Ali Khan", "Allama Iqbal", "Ayub Khan"], 1, "Liaquat Ali Khan was the first Prime Minister of Pakistan.", 'ppsc-part-ii'],
          ["Which is the largest river of Pakistan?", ["Indus River", "Jhelum River", "Chenab River", "Ravi River"], 0, "Indus River is the longest and largest river of Pakistan.", 'ppsc-part-ii']
        ]
      },
      {
        id: 'spsc-software-engineer',
        title: 'SPSC Software Engineer Simulation',
        category: 'SPSC',
        course: 'Software Engineer (BS-17)',
        case_no: 'Case No. 04-SE/2026',
        duration: 6000,
        passing_score: 50.0,
        logo_url: 'spsc',
        negative_marking: 0.25,
        sections: [
          { id: 'spsc-part-i', name: 'Part I - Software Engineering' },
          { id: 'spsc-part-ii', name: 'Part II - General Ability' }
        ],
        questions: [
          ["What does the 'S' in SOLID principles stand for?", ["Single Responsibility", "Scope", "Security", "Scalability"], 0, "S stands for Single Responsibility Principle.", 'spsc-part-i'],
          ["Which software development methodology focuses on quick iterations and agility?", ["Waterfall", "Agile", "Spiral", "V-Model"], 1, "Agile methodology emphasizes speed and iterative progress.", 'spsc-part-i'],
          ["Which city is known as the 'City of Lights' in Pakistan?", ["Lahore", "Karachi", "Islamabad", "Peshawar"], 1, "Karachi is known as the City of Lights.", 'spsc-part-ii'],
          ["Mohenjo-daro is located in which district of Sindh?", ["Larkana", "Sukkur", "Hyderabad", "Karachi"], 0, "Mohenjo-daro is located in the Larkana District of Sindh.", 'spsc-part-ii']
        ]
      },
      {
        id: 'bpsc-programmer',
        title: 'BPSC Programmer Simulation',
        category: 'BPSC',
        course: 'Programmer (BS-17)',
        case_no: 'Case No. 08-PR/2026',
        duration: 7200,
        passing_score: 45.0,
        logo_url: 'bpsc',
        negative_marking: 0.25,
        sections: [
          { id: 'bpsc-part-i', name: 'Part I - Programming & DBMS' },
          { id: 'bpsc-part-ii', name: 'Part II - English & GK' }
        ],
        questions: [
          ["What is the primary key in a database table?", ["A unique identifier for a row", "A foreign key link", "A nullable string", "A database index"], 0, "A primary key uniquely identifies each record in a database table.", 'bpsc-part-i'],
          ["Which programming language is typically used for client-side web scripting?", ["Python", "Java", "JavaScript", "C++"], 2, "JavaScript is the standard language for browser/client-side scripting.", 'bpsc-part-i'],
          ["Which is the largest province of Pakistan by land area?", ["Punjab", "Sindh", "Balochistan", "KPK"], 2, "Balochistan is the largest province of Pakistan by area.", 'bpsc-part-ii'],
          ["What is the capital of Balochistan?", ["Quetta", "Gwadar", "Sibi", "Turbat"], 0, "Quetta is the provincial capital of Balochistan.", 'bpsc-part-ii']
        ]
      },
      {
        id: 'kppsc-network-admin',
        title: 'KPPSC Network Admin Simulation',
        category: 'KPPSC',
        course: 'Network Administrator (BS-17)',
        case_no: 'Case No. 02-NA/2026',
        duration: 6000,
        passing_score: 40.0,
        logo_url: 'kppsc',
        negative_marking: 0.25,
        sections: [
          { id: 'kppsc-part-i', name: 'Part I - Networking & Security' },
          { id: 'kppsc-part-ii', name: 'Part II - General Intelligence' }
        ],
        questions: [
          ["What port does HTTPS use by default?", ["80", "8080", "443", "22"], 2, "HTTPS uses port 443 by default.", 'kppsc-part-i'],
          ["What does 'VPN' stand for in computer networking?", ["Virtual Private Network", "Variable Path Node", "Verified Public Network", "Virtual Public Network"], 0, "VPN stands for Virtual Private Network.", 'kppsc-part-i'],
          ["Which mountain pass connects Peshawar with Afghanistan?", ["Bolan Pass", "Khyber Pass", "Khunjerab Pass", "Tochi Pass"], 1, "Khyber Pass connects Peshawar with Kabul, Afghanistan.", 'kppsc-part-ii'],
          ["Where is the famous lake Saif-ul-Muluk located?", ["Swat Valley", "Naran Valley", "Kaghan Valley", "Gilgit"], 2, "Lake Saif-ul-Muluk is located in Kaghan Valley, KP.", 'kppsc-part-ii']
        ]
      }
    ]

    for (const exam of examsToSeed) {
      const examCheck = await pool.query('SELECT 1 FROM exams WHERE id = $1', [exam.id])
      if (examCheck.rowCount === 0) {
        console.log(`Seeding exam: ${exam.title}`)
        await pool.query(`
          INSERT INTO exams (id, title, category, course, case_no, duration, passing_score, logo_url, negative_marking)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          exam.id,
          exam.title,
          exam.category,
          exam.course,
          exam.case_no,
          exam.duration,
          exam.passing_score,
          exam.logo_url,
          exam.negative_marking
        ])

        // Seed sections
        for (const sec of exam.sections) {
          await pool.query(`
            INSERT INTO exam_sections (id, exam_id, name) VALUES ($1, $2, $3)
          `, [sec.id, exam.id, sec.name])
        }

        // Seed questions if explicitly provided
        if (exam.questions) {
          for (const q of exam.questions) {
            await pool.query(`
              INSERT INTO questions (section_id, question_text, options, correct_answer_index, explanation)
              VALUES ($1, $2, $3, $4, $5)
            `, [q[4], q[0], q[1], q[2], q[3]])
          }
        } else if (exam.id === 'fpsc-system-analyst') {
          // Seed FPSC 200 Questions
          console.log('Seeding 200 question bank into questions table for FPSC System Analyst...')
          for (const q of englishQuestions) {
            await pool.query(`
              INSERT INTO questions (section_id, question_text, options, correct_answer_index, explanation)
              VALUES ('part-i', $1, $2, $3, $4)
            `, [q[0], q[1], q[2], q[3]])
          }
          for (const q of generalQuestions) {
            await pool.query(`
              INSERT INTO questions (section_id, question_text, options, correct_answer_index, explanation)
              VALUES ('part-ii-gi', $1, $2, $3, $4)
            `, [q[0], q[1], q[2], q[3]])
          }
          for (const q of professionalQuestions) {
            await pool.query(`
              INSERT INTO questions (section_id, question_text, options, correct_answer_index, explanation)
              VALUES ('part-iii-cs', $1, $2, $3, $4)
            `, [q[0], q[1], q[2], q[3]])
          }
        }
      } else {
        // Update negative_marking and logo_url just in case
        await pool.query(`
          UPDATE exams 
          SET logo_url = $1, negative_marking = $2
          WHERE id = $3
        `, [exam.logo_url, exam.negative_marking, exam.id])
      }
    }

    console.log('Database initialization fully complete!')
  } catch (err) {
    console.error('Error during database initialization:', err)
    throw err
  }
}
