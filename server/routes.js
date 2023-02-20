const router = require('express').Router();
const controllers = require('./controllers');

// QUESTIONS ROUTES
router.get('/qa/questions', controllers.questions.getQuestions);
router.post('/qa/questions', controllers.questions.postQuestion);
router.put('/qa/questions/:question_id/helpful', controllers.questions.markHelpfulQuestion);
router.put('/qa/questions/:question_id/report', controllers.questions.reportQuestion);

// ANSWERS ROUTES
router.get('/qa/questions/:question_id/answers', controllers.answers.getAnswers);
router.post('/qa/questions/:question_id/answers', controllers.answers.postAnswer);
router.put('/qa/answers/:answer_id/helpful', controllers.answers.markHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', controllers.answers.reportAnswer);

module.exports = router;
