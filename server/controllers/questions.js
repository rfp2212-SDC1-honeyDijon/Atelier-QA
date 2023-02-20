const models = require('../models');

const getQuestions = (req, res) => {
  models.questions
    .getQuestions(req)
    .then((result) => {
      console.info('Retrieved questions');
      res.status(200).send(result.rows[0].json_build_object);
    })
    .catch((err) => res.status(500).send(err));
};

const postQuestion = (req, res) => {
  models.questions
    .postQuestion(req)
    .then(() => res.status(201).send('Posted question'))
    .catch((err) => res.status(500).send(err));
};

const markHelpfulQuestion = (req, res) => {
  models.questions
    .markHelpfulQuestion()
    .then()
    .catch((err) => res.status(500).send(err));
};

const reportQuestion = (req, res) => {
  models.questions
    .reportQuestion()
    .then()
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getQuestions,
  postQuestion,
  markHelpfulQuestion,
  reportQuestion
};
