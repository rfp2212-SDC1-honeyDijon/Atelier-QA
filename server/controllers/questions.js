// require('dotenv').config();
// const Redis = require('ioredis');
const models = require('../models');
const { getCache, setCache } = require('../caching.js');

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT
// });

const getQuestions = async (req, res) => {
  const cachedValue = await getCache(`questions: ${req.query.product_id}`);

  if (cachedValue) {
    res.status(200).json(cachedValue);
  } else {
    models.questions
      .getQuestions(req)
      .then((result) => {
        setCache(`questions: ${req.query.product_id}`, result.rows[0].json_build_object);
        res.status(200).send(result.rows[0].json_build_object);
      })
      .catch((err) => res.status(500).send(err));
  }
};

const postQuestion = (req, res) => {
  models.questions
    .postQuestion(req)
    .then(() => res.status(201).send('Posted question'))
    .catch((err) => res.status(500).send(err));
};

const markHelpfulQuestion = (req, res) => {
  models.questions
    .markHelpfulQuestion(req)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
};

const reportQuestion = (req, res) => {
  models.questions
    .reportQuestion(req)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getQuestions,
  postQuestion,
  markHelpfulQuestion,
  reportQuestion
};
