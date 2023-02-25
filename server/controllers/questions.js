const models = require('../models');
// const { getCache, setCache } = require('../caching.js');

const getQuestions = async (req, res) => {
  // const count = req.query.count || 5;
  // const page = req.query.page || 1;
  // const key = `questions: ${req.query.product_id}${count}${page}`;
  // const cachedValue = await getCache(key);

  // if (cachedValue) {
  //   console.log('i am being cached');
  //   res.status(200).send({ ...cachedValue, source: 'redisCache' });
  // } else {
    models.questions
      .getQuestions(req)
      .then((result) => {
        setCache(key, result.rows[0].json_build_object);
        res.status(200).send(result.rows[0].json_build_object);
      })
      .catch((err) => res.status(500).send(err));
  // }
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
