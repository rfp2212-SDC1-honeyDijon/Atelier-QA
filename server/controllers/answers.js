const models = require('../models');
const { getCache, setCache } = require('../caching.js');

const getAnswers = async (req, res) => {
  const cacheKey = await getCache(`answers: ${req.params.question_id}`);

  if (cacheKey) {
    const cachedData = JSON.parse(cacheKey);
    res.status(200).json(cachedData);
  } else {
    models.answers
      .getAnswers(req)
      .then((result) => {
        console.info('Retrieved answers');
        setCache(cacheKey, result.rows[0].json_build_object);
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
