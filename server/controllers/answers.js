const models = require('../models');
console.log('models', models);

const getAnswers = (req, res) => {
  models.answers
    .getAnswers(req)
    .then((result) => {
      console.info('Retrieved answers');
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
};

const postAnswer = (req, res) => {
  models.answers
    .postAnswer(req)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(500).send(err));
};

const markHelpfulAnswer = (req, res) => {
  models.answers
    .markHelpfulAnswer(req)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
};

const reportAnswer = (req, res) => {
  models.answers
    .reportAnswer(req)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getAnswers,
  postAnswer,
  markHelpfulAnswer,
  reportAnswer
};
