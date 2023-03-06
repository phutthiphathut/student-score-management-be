/* Create Tables */

CREATE TABLE users (
  user_id SERIAL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email_address VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE Course (
  course_id VARCHAR(10),
  "section" INTEGER NOT NULL,
  course_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (course_id, "section")
);

CREATE TABLE Teach (
  course_id VARCHAR(10),
  "section" INTEGER,
  teacher_id INTEGER NOT NULL,
  room VARCHAR(10) NOT NULL,
  day_of_week VARCHAR(10) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  PRIMARY KEY (course_id, "section",day_of_week),
  FOREIGN KEY (course_id,"section") REFERENCES Course(course_id,"section"),
  FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);

CREATE TABLE Evaluation (
  evaluation_id SERIAL,
  evaluation_title VARCHAR(50) NOT NULL,
  full_score INTEGER NOT NULL,
  course_id VARCHAR(10) NOT NULL,
  "section" INTEGER NOT NULL,
  PRIMARY KEY (evaluation_id),
  FOREIGN KEY (course_id,"section") REFERENCES Course(course_id,"section")
);

CREATE TABLE Rubric (
  evaluation_id INTEGER NOT NULL,
  rubric_id SERIAL,
  rubric_title VARCHAR(50) NOT NULL,
  full_score INTEGER NOT NULL,
  PRIMARY KEY (rubric_id),
  FOREIGN KEY (evaluation_id) REFERENCES Evaluation(evaluation_id)
);

CREATE TABLE Rubric_Score (
  student_id INTEGER,
  rubric_id INTEGER,
  rubric_received_score NUMERIC(18,2),
  PRIMARY KEY (student_id, rubric_id),
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (rubric_id) REFERENCES Rubric(rubric_id)  
);

CREATE TABLE Evaluation_Score (
  student_id INTEGER,
  evaluation_id INTEGER,
  eval_received_score NUMERIC(18,2),
  feedback VARCHAR(1000),
  PRIMARY KEY (student_id, evaluation_id),
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (evaluation_id) REFERENCES Evaluation(evaluation_id)
);

CREATE TABLE Appeal (
  student_id INTEGER,
  evaluation_id INTEGER,
  pd_id INTEGER NOT NULL,
  reason VARCHAR(1000),
  remark VARCHAR(1000),
  status VARCHAR(10) NOT NULL,
  PRIMARY KEY (student_id, evaluation_id),
  FOREIGN KEY (student_id, evaluation_id) REFERENCES Evaluation_Score(student_id, evaluation_id),
  FOREIGN KEY (pd_id) REFERENCES users(user_id)
);



/* Insert Example Data */

INSERT INTO users (first_name, last_name, email_address, password, role)
VALUES ('John', 'Doe', 'johndoe@example.com', 'password', 'student'),
       ('Jane', 'Doe', 'janedoe@example.com', 'password', 'teacher'),
       ('Bob', 'Smith', 'bobsmith@example.com', 'password', 'program_director'),
       ('Alice', 'Johnson', 'alicejohnson@example.com', 'password', 'student'),
       ('David', 'Lee', 'davidlee@example.com', 'password', 'teacher'),
       ('Emily', 'Chen', 'emilychen@example.com', 'password', 'student'),
       ('Mark', 'Kim', 'markkim@example.com', 'password', 'teacher'),
       ('Sara', 'Park', 'sarapark@example.com', 'password', 'student'),
       ('Mike', 'Wu', 'mikewu@example.com', 'password', 'student'),
       ('Lucy', 'Zhang', 'lucyzhang@example.com', 'password', 'teacher'),
       ('Alice', 'Seth', 'alice@example.com', 'password', 'program_director');


INSERT INTO Course (course_id, section, course_name)
VALUES ('CS101', 541, 'Introduction to Computer Science'),
       ('MATH201', 542, 'Calculus II'),
       ('ENG101', 541, 'Introduction to Literature'),
       ('HIST202', 543, 'World History since 1500'),
       ('CHEM101', 542, 'General Chemistry I'),
       ('PHYS202', 541, 'Electricity and Magnetism'),
       ('ECON101', 541, 'Principles of Microeconomics'),
       ('PSYCH101', 542, 'Introduction to Psychology'),
       ('ART101', 541, 'Art Appreciation'),
       ('PHIL201', 543, 'Introduction to Ethics');


INSERT INTO Teach (course_id, section, teacher_id, room, day_of_week, start_time, end_time)
VALUES ('CS101', 541, 2, '101', 'Monday', '10:00:00', '11:30:00'),
       ('MATH201', 542, 5, '201', 'Wednesday', '13:00:00', '14:30:00'),
       ('ENG101', 541, 7, '105', 'Friday', '9:00:00', '10:30:00'),
       ('HIST202', 543, 10, '301', 'Thursday', '15:00:00', '16:30:00'),
       ('CHEM101', 542, 5, '102', 'Tuesday', '12:00:00', '13:30:00'),
       ('PHYS202', 541, 2, '201', 'Monday', '13:00:00', '14:30:00'),
       ('ECON101', 541, 7, '101', 'Thursday', '10:00:00', '11:30:00'),
       ('PSYCH101', 542, 10, '203', 'Wednesday', '9:00:00', '10:30:00'),
       ('ART101', 541, 5, '305', 'Tuesday', '14:00:00', '15:00:00'),
       ('PHIL201', 543, 2, '405', 'Friday', '11:00:00', '12:30:00');


INSERT INTO Evaluation (evaluation_title, full_score, course_id, section)
VALUES ('Midterm Exam', 100, 'CS101', 541),
	  ('Final Exam', 100, 'MATH201', 542),
	  ('Essay', 50, 'ENG101', 541),
	  ('Research Paper', 100, 'HIST202', 543),
	  ('Lab Report', 50, 'CHEM101', 542),
	  ('Problem Set', 100, 'PHYS202', 541),
	  ('Quiz', 20, 'ECON101', 541),
	  ('Presentation', 50, 'PSYCH101', 542),
	  ('Art Project', 50, 'ART101', 541),
	  ( 'Philosophy Paper', 100, 'PHIL201', 543);

INSERT INTO Rubric (evaluation_id, rubric_title, full_score)
VALUES (1, 'Problem Solving', 20),
	(1, 'Conceptual Understanding', 20),
	(1, 'Code Efficiency', 60),
	(2, 'Problem Solving', 20),
	(2, 'Conceptual Understanding', 20),
	(2, 'Proof Writing', 60),
	(3, 'Clarity', 10),
	(3, 'Originality', 40),
	(4, 'Research', 70),
	(4, 'Analysis', 30),
	(5, 'Accuracy', 30),
	(5, 'Presentation', 20),
	(6, 'Problem Solving', 60),
	(6, 'Conceptual Understanding', 40),
	(7, 'Problem Solving', 10),
	(7, 'Conceptual Understanding', 10),
	(8, 'Content', 30),
	(8, 'Delivery', 20),
	(9, 'Creativity', 30),
	(9, 'Presentation', 20),
	(10, 'Clarity', 50),
	(10, 'Originality', 50);

INSERT INTO Rubric_Score (student_id, rubric_id, rubric_received_score)
VALUES (1, 1, 18.5),
(1, 2, 19),
(1, 3, 47.5),
(4, 1, 20),
(4, 2, 20),
(4, 3, 56),
(6, 1, 20),
(6, 2, 20),
(6, 3, 60),
(8, 1, 18),
(8, 2, 10),
(8, 3, 10);


INSERT INTO Evaluation_Score (student_id, evaluation_id, eval_received_score, feedback)
VALUES (1, 1, 85, 'Good job overall, but could use more practice on recursion'),
(1, 2, 92, 'Excellent performance, keep up the good work!'),
(1, 3, 42, 'Needs improvement on thesis statement and organization'),
(4, 1, 96, 'Outstanding work, very few errors'),
(4, 2, 94, 'Impressive analysis, excellent use of sources'),
(4, 3, 44, 'Lacks originality and creativity, could use more vivid language'),
(6, 1, 100, 'Perfect score, well done!'),
(6, 2, 97, 'Excellent understanding of concepts and problem-solving skills'),
(8, 1, 38, 'Very good content and delivery, but could use more eye contact'),
(8, 2, 40, 'Outstanding presentation, well done!');


INSERT INTO Appeal (student_id, evaluation_id, pd_id, reason, remark, status)
VALUES (1, 1, 3, 'Disagreement with grading of problem 4', 'Requesting re-evaluation of problem 4', 'Pending'),
(1, 2, 11, 'Missed exam due to illness', 'Requesting make-up exam or alternate assignment', 'Accepted'),
(4, 1, 3, 'Missed exam due to family emergency', 'Requesting make-up exam or alternate assignment', 'Denied'),
(6, 1, 3, 'Disagreement with grading of problem 2', 'Requesting re-evaluation of problem 2', 'Pending'),
(8, 1, 3, 'Disagreement with grading of problem 1', 'Requesting re-evaluation of problem 1', 'Accepted')
