const models = require('../models/questions.js');

const getQuestions = (req, res) => {
  const prodID = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  models.getQuestions(prodID, count, page)
    .then((result) => {
      console.info('Retrieved questions');
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getQuestions
};
