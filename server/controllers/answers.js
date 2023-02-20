const models = require('../models');

const getAnswers = (req, res) => {
  const quesID = req.param.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * count;

  models.answers
    .getAnswers(quesID, count, offset)
    .then((result) => {
      console.info('Retrieved answers');
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
};

const postAnswer = (req, res) => {
  models.answers
    .postAnswer()
    .then()
    .catch();
};

const markHelpfulAnswer = (req, res) => {
  models.answers
    .markHelpfulAnswer()
    .then()
    .catch();
};

const reportAnswer = (req, res) => {
  models.answers
    .reportAnswer()
    .then()
    .catch();
};

module.exports = {
  getAnswers,
  postAnswer,
  markHelpfulAnswer,
  reportAnswer
};
