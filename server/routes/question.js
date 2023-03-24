const router = require('express').Router();

const questionController = require('../controllers/questionController');

router.get('/', questionController.getQuestions);

router.get('/:questionId', questionController.getQuestion);

router.post('/', questionController.handleQuestion);

router.post('/test', questionController.test);

module.exports = router;
