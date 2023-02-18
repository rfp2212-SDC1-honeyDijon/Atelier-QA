const models = require('../models');

const getQuestions = (req, res) => {
  const prodID = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * count;
  console.log('offset', offset);

  models.questions.getQuestions(prodID, count, offset)
    .then((result) => {
      console.info('Retrieved questions');
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getQuestions
};
