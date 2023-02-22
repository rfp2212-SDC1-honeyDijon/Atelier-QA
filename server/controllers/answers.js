const models = require('../models');
const { getCache, setCache } = require('../caching.js');

const getAnswers = async (req, res) => {
  const key = `answers: ${req.params.question_id}`;
  const cachedValue = await getCache(key);

  if (cachedValue) {
    res.status(200).json(cachedValue);
  } else {
    models.answers
      .getAnswers(req)
      .then((result) => {
        setCache(key, result.rows[0].json_build_object);
        res.status(200).send(result.rows[0].json_build_object);
      })
      .catch((err) => res.status(500).send(err));
  }
};

const postAnswer = (req, res) => {
  models.answers
    .postAnswer(req)
    .then(() => res.status(201).send('Posted answer'))
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
