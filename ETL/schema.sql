DROP DATABASE questionsandanswers
CREATE DATABASE questionsandanswers;

\c questionsandanswers;

CREATE TABLE questions {
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  body VARCHAR(1005),
  date_written TIMESTAMP,
  asker_name VARCHAR(65),
  asker_email VARCHAR(65),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0
};

CREATE TABLE answers {
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER,
  body VARCHAR (1005),
  date_written TIMESTAMP,
  answerer_name VARCHAR(65),
  answerer_email VARCHAR(65),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id)
};

CREATE TABLE answers_photos {
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INTEGER,
  url TEXT,
  FOREIGN KEY (answer_id) REFERENCES answers(id)
};
