require('dotenv').config();
const Redis = require('ioredis');
const models = require('../models');
// const { getCache, setCache } = require('../caching.js');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redis.on('ready', () => console.info('Connected to Redis'));
redis.on('error', (err) => console.error(`Redis connection error: ${err}`));

const getQuestions = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const key = `${req.query.product_id}${count}${page}`;
  const beforeRedis = new Date().getTime();
  let flag = 0;

  redis.get(key)
    .then((cachedValue) => {
      const afterRedis = new Date().getTime();
      flag = 1;
      console.log(`redis time: ${afterRedis - beforeRedis}, flag: ${flag}`);
      // console.log('cachedValue', cachedValue);
      if (cachedValue) {
        let data = JSON.parse(cachedValue);
        res.status(200).send(data);
      } else {
        const beforeDB = new Date().getTime();
        models.questions
          .getQuestions(req)
          .then((result) => {
            const afterDB = new Date().getTime();
            console.log(`db time: ${afterDB - beforeDB}`);
            res.status(200).send(result.rows[0].json_build_object);
            redis.set(key, JSON.stringify(result.rows[0].json_build_object), 'EX', process.env.REDIS_TTL);
          })
          .catch((err) => res.status(500).send(err));
      }
    })
    .catch((err) => console.error(err));
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
