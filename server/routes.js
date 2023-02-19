const router = require('express').Router();
const controllers = require('./controllers');

router.get('/qa/questions', controllers.questions.getQuestions);
// router.get('/qa/')

module.exports = router;
