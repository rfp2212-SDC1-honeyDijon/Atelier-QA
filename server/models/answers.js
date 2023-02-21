const db = require('../database/db.js');

const getAnswers = (req) => {
  const quesID = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * count;

  const query = ``;

  return db.query(query, [quesID, count, offset]);
};

const postAnswer = (req) => {
  const quesID = req.params.question_id;
  const body = req.body.body;
  const date = new Date().toISOString();
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  const query = `
    INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const parameters = [quesID, body, date, name, email, false, 0];

  // if (photos.length > 0) {
  // };

  return db.query(query, parameters);
};

const markHelpfulAnswer = (req) => {

};

const reportAnswer = (req) => {

};

module.exports = {
  getAnswers,
  postAnswer,
  markHelpfulAnswer,
  reportAnswer
};
