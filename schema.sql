DROP DATABASE IF EXISTS questionsandanswers;
CREATE DATABASE questionsandanswers;

\c questionsandanswers;

-- CREATE TABLES
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  body VARCHAR(1005),
  date_written VARCHAR,
  asker_name VARCHAR(65),
  asker_email VARCHAR(65),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER,
  body VARCHAR(1005),
  date_written VARCHAR,
  answerer_name VARCHAR(65),
  answerer_email VARCHAR(65),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INTEGER,
  url VARCHAR(2048),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
);


-- CREATE INDICES
CREATE INDEX product_id_index ON questions (product_id);
CREATE INDEX question_id_index ON answers (question_id);
CREATE INDEX answer_id_index ON photos (answer_id);

-- COPY FOR LOADING
COPY questions FROM '/Users/aimeekang/HackReactor/SDC/SDC-QA/ETL/transformed_data/cleanQuestions.csv' WITH (FORMAT CSV, HEADER true);
COPY answers FROM '/Users/aimeekang/HackReactor/SDC/SDC-QA/ETL/transformed_data/cleanAnswers.csv' WITH (FORMAT CSV, HEADER true);
COPY photos FROM '/Users/aimeekang/HackReactor/SDC/SDC-QA/ETL/transformed_data/cleanAnswersPhotos.csv' WITH (FORMAT CSV, HEADER true);


-- ALTER COLUMN
-- ALTER TABLE questions ALTER COLUMN date_written TYPE bigint USING date_written::bigint;
-- ALTER TABLE answers ALTER COLUMN date_written TYPE bigint USING date_written::bigint;

-- ALTER TABLE questions ALTER COLUMN date_written TYPE timestamp USING to_timestamp(date_written / 1000);
-- ALTER TABLE answers ALTER COLUMN date_written TYPE timestamp USING to_timestamp(date_written / 1000);

-- RESET PRIMARY KEY SEQUENCE
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));