const models = require('../models/questions.js');

const getQuestions = (req, res) => {
  models.getQuestions()
    .then((result) => {
      console.info('Retrieved questions');
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getQuestions
};
