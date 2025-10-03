-- Database seeding script for Computer Science Engineering curriculum
-- 8 semesters with real subjects and units

-- Insert Semesters
INSERT INTO "Semester" (name, "branchId") VALUES
('Semester 1', 1),
('Semester 2', 1),
('Semester 3', 1),
('Semester 4', 1),
('Semester 5', 1),
('Semester 6', 1),
('Semester 7', 1),
('Semester 8', 1);

-- Semester 1 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Engineering Mathematics I', 1),
('Engineering Physics', 1),
('Engineering Chemistry', 1),
('Programming for Problem Solving', 1),
('Engineering Graphics', 1),
('English for Communication', 1);

-- Semester 2 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Engineering Mathematics II', 2),
('Engineering Physics II', 2),
('Basic Electrical Engineering', 2),
('Engineering Mechanics', 2),
('Basic Electronics Engineering', 2),
('Environmental Science', 2);

-- Semester 3 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Engineering Mathematics III', 3),
('Data Structures and Algorithms', 3),
('Digital Logic Design', 3),
('Computer Organization', 3),
('Object Oriented Programming', 3),
('Discrete Mathematics', 3);

-- Semester 4 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Engineering Mathematics IV', 4),
('Database Management Systems', 4),
('Operating Systems', 4),
('Computer Networks', 4),
('Software Engineering', 4),
('Theory of Computation', 4);

-- Semester 5 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Design and Analysis of Algorithms', 5),
('Computer Graphics', 5),
('Web Technologies', 5),
('Compiler Design', 5),
('Machine Learning', 5),
('Information Security', 5);

-- Semester 6 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Artificial Intelligence', 6),
('Mobile Application Development', 6),
('Cloud Computing', 6),
('Software Testing', 6),
('Human Computer Interaction', 6),
('Project Management', 6);

-- Semester 7 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Big Data Analytics', 7),
('Internet of Things', 7),
('Blockchain Technology', 7),
('Cyber Security', 7),
('DevOps and Automation', 7),
('Research Methodology', 7);

-- Semester 8 Subjects
INSERT INTO "Subject" (name, "semesterId") VALUES
('Advanced Machine Learning', 8),
('Distributed Systems', 8),
('Quantum Computing', 8),
('Industry 4.0', 8),
('Entrepreneurship Development', 8),
('Major Project', 8);

-- Units for Semester 1 Subjects

-- Engineering Mathematics I Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Differential Calculus', 1),
('Integral Calculus', 1),
('Matrices and Determinants', 1),
('Vector Calculus', 1),
('Infinite Series', 1);

-- Engineering Physics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Mechanics and Properties of Matter', 2),
('Heat and Thermodynamics', 2),
('Wave Motion and Acoustics', 2),
('Optics', 2),
('Electromagnetism', 2);

-- Engineering Chemistry Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Atomic Structure and Chemical Bonding', 3),
('Thermodynamics and Chemical Equilibrium', 3),
('Electrochemistry', 3),
('Corrosion and its Prevention', 3),
('Fuels and Combustion', 3);

-- Programming for Problem Solving Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Introduction to Programming', 4),
('Control Structures', 4),
('Functions and Arrays', 4),
('Pointers and Structures', 4),
('File Handling', 4);

-- Engineering Graphics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Geometric Constructions', 5),
('Orthographic Projections', 5),
('Isometric Projections', 5),
('Sectional Views', 5),
('Development of Surfaces', 5);

-- English for Communication Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Grammar and Vocabulary', 6),
('Reading Comprehension', 6),
('Writing Skills', 6),
('Listening and Speaking', 6),
('Technical Communication', 6);

-- Units for Semester 2 Subjects

-- Engineering Mathematics II Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Differential Equations', 7),
('Laplace Transforms', 7),
('Fourier Series', 7),
('Partial Differential Equations', 7),
('Complex Variables', 7);

-- Engineering Physics II Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Modern Physics', 8),
('Quantum Mechanics', 8),
('Solid State Physics', 8),
('Nuclear Physics', 8),
('Semiconductor Physics', 8);

-- Basic Electrical Engineering Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('DC Circuits', 9),
('AC Circuits', 9),
('Magnetic Circuits', 9),
('Transformers', 9),
('Electrical Machines', 9);

-- Engineering Mechanics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Statics of Particles', 10),
('Rigid Body Statics', 10),
('Dynamics of Particles', 10),
('Rigid Body Dynamics', 10),
('Vibrations', 10);

-- Basic Electronics Engineering Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Semiconductor Devices', 11),
('Amplifiers', 11),
('Oscillators', 11),
('Digital Electronics', 11),
('Communication Systems', 11);

-- Environmental Science Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Ecosystem and Biodiversity', 12),
('Environmental Pollution', 12),
('Natural Resources', 12),
('Environmental Impact Assessment', 12),
('Sustainable Development', 12);

-- Units for Semester 3 Subjects

-- Engineering Mathematics III Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Linear Algebra', 13),
('Probability and Statistics', 13),
('Numerical Methods', 13),
('Graph Theory', 13),
('Optimization Techniques', 13);

-- Data Structures and Algorithms Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Arrays and Linked Lists', 14),
('Stacks and Queues', 14),
('Trees and Graphs', 14),
('Sorting and Searching', 14),
('Hashing and Heaps', 14);

-- Digital Logic Design Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Number Systems', 15),
('Boolean Algebra', 15),
('Combinational Circuits', 15),
('Sequential Circuits', 15),
('Memory and Programmable Logic', 15);

-- Computer Organization Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Computer Architecture', 16),
('Instruction Set Architecture', 16),
('CPU Design', 16),
('Memory Hierarchy', 16),
('Input/Output Systems', 16);

-- Object Oriented Programming Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('OOP Concepts', 17),
('Classes and Objects', 17),
('Inheritance and Polymorphism', 17),
('Exception Handling', 17),
('GUI Programming', 17);

-- Discrete Mathematics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Set Theory and Logic', 18),
('Relations and Functions', 18),
('Combinatorics', 18),
('Graph Theory', 18),
('Algebraic Structures', 18);

-- Units for Semester 4 Subjects

-- Engineering Mathematics IV Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Vector Calculus', 19),
('Complex Analysis', 19),
('Transforms', 19),
('Partial Differential Equations', 19),
('Statistical Methods', 19);

-- Database Management Systems Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Database Concepts', 20),
('Relational Model', 20),
('SQL and Query Processing', 20),
('Normalization', 20),
('Transaction Management', 20);

-- Operating Systems Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('OS Introduction', 21),
('Process Management', 21),
('Memory Management', 21),
('File Systems', 21),
('Synchronization and Deadlocks', 21);

-- Computer Networks Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Network Fundamentals', 22),
('OSI and TCP/IP Models', 22),
('Data Link Layer', 22),
('Network Layer', 22),
('Transport and Application Layers', 22);

-- Software Engineering Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Software Process Models', 23),
('Requirements Engineering', 23),
('System Design', 23),
('Testing and Maintenance', 23),
('Project Management', 23);

-- Theory of Computation Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Finite Automata', 24),
('Regular Languages', 24),
('Context-Free Grammars', 24),
('Pushdown Automata', 24),
('Turing Machines', 24);

-- Units for Semester 5 Subjects

-- Design and Analysis of Algorithms Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Algorithm Analysis', 25),
('Divide and Conquer', 25),
('Greedy Algorithms', 25),
('Dynamic Programming', 25),
('Graph Algorithms', 25);

-- Computer Graphics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Graphics Primitives', 26),
('2D Transformations', 26),
('3D Graphics', 26),
('Clipping and Windowing', 26),
('Animation and Rendering', 26);

-- Web Technologies Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('HTML and CSS', 27),
('JavaScript and DOM', 27),
('Server-side Programming', 27),
('Web Frameworks', 27),
('Web Services and APIs', 27);

-- Compiler Design Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Lexical Analysis', 28),
('Syntax Analysis', 28),
('Semantic Analysis', 28),
('Code Generation', 28),
('Code Optimization', 28);

-- Machine Learning Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('ML Fundamentals', 29),
('Supervised Learning', 29),
('Unsupervised Learning', 29),
('Neural Networks', 29),
('Model Evaluation', 29);

-- Information Security Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Cryptography', 30),
('Network Security', 30),
('Web Security', 30),
('Security Protocols', 30),
('Risk Management', 30);

-- Units for Semester 6 Subjects

-- Artificial Intelligence Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('AI Fundamentals', 31),
('Search Algorithms', 31),
('Knowledge Representation', 31),
('Expert Systems', 31),
('Natural Language Processing', 31);

-- Mobile Application Development Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Mobile Platforms', 32),
('Android Development', 32),
('iOS Development', 32),
('Cross-platform Development', 32),
('Mobile UI/UX', 32);

-- Cloud Computing Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Cloud Fundamentals', 33),
('Virtualization', 33),
('Cloud Service Models', 33),
('Cloud Deployment', 33),
('Cloud Security', 33);

-- Software Testing Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Testing Fundamentals', 34),
('Test Design Techniques', 34),
('Automated Testing', 34),
('Performance Testing', 34),
('Test Management', 34);

-- Human Computer Interaction Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('HCI Principles', 35),
('User Interface Design', 35),
('Usability Engineering', 35),
('Interaction Design', 35),
('User Experience', 35);

-- Project Management Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Project Planning', 36),
('Risk Management', 36),
('Team Management', 36),
('Quality Management', 36),
('Project Execution', 36);

-- Units for Semester 7 Subjects

-- Big Data Analytics Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Big Data Fundamentals', 37),
('Hadoop Ecosystem', 37),
('Data Mining', 37),
('NoSQL Databases', 37),
('Data Visualization', 37);

-- Internet of Things Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('IoT Architecture', 38),
('Sensors and Actuators', 38),
('Communication Protocols', 38),
('IoT Platforms', 38),
('IoT Security', 38);

-- Blockchain Technology Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Blockchain Fundamentals', 39),
('Cryptocurrency', 39),
('Smart Contracts', 39),
('Consensus Mechanisms', 39),
('Blockchain Applications', 39);

-- Cyber Security Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Security Threats', 40),
('Incident Response', 40),
('Digital Forensics', 40),
('Ethical Hacking', 40),
('Security Governance', 40);

-- DevOps and Automation Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('DevOps Culture', 41),
('Continuous Integration', 41),
('Containerization', 41),
('Infrastructure as Code', 41),
('Monitoring and Logging', 41);

-- Research Methodology Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Research Process', 42),
('Literature Review', 42),
('Data Collection Methods', 42),
('Statistical Analysis', 42),
('Technical Writing', 42);

-- Units for Semester 8 Subjects

-- Advanced Machine Learning Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Deep Learning', 43),
('Reinforcement Learning', 43),
('Computer Vision', 43),
('Generative AI', 43),
('MLOps', 43);

-- Distributed Systems Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Distributed Computing', 44),
('Consistency Models', 44),
('Fault Tolerance', 44),
('Distributed Algorithms', 44),
('Microservices', 44);

-- Quantum Computing Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Quantum Mechanics', 45),
('Quantum Algorithms', 45),
('Quantum Cryptography', 45),
('Quantum Hardware', 45),
('Quantum Programming', 45);

-- Industry 4.0 Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Smart Manufacturing', 46),
('Industrial IoT', 46),
('Digital Twins', 46),
('Automation Technologies', 46),
('Cyber-Physical Systems', 46);

-- Entrepreneurship Development Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Business Planning', 47),
('Innovation Management', 47),
('Startup Ecosystem', 47),
('Funding and Investment', 47),
('Legal and Regulatory', 47);

-- Major Project Units
INSERT INTO "Unit" (name, "subjectId") VALUES
('Project Proposal', 48),
('Literature Survey', 48),
('System Design', 48),
('Implementation', 48),
('Testing and Documentation', 48);