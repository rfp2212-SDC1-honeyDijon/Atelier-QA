const models = require('../models');

const getQuestions = (req, res) => {
  const prodID = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * count;

  models.questions.getQuestions(prodID, count, offset)
    .then((result) => {
      console.log('result', result.rows[0]);
      console.info('Retrieved questions');
      res.status(200).send(result.rows[0].json_build_object);
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getQuestions
};
