const router = require('express').Router();

const chapterController = require('../controllers/chapterController');

router.get(
	'/:chapterId/question/:questionId',
	chapterController.getChapterQuestions
);

router.post('/:chapterId/question/', chapterController.postQuestion);

router.post('/:chapterId/questions/', chapterController.postQuestions);

module.exports = router;
