const router = require('express').Router();
const lectureController = require('../controllers/lectureController');
router.get('/', lectureController.getLectures);
router.get('/user', lectureController.getLecturesUser);

router.get('/:lectureId', lectureController.getLecture);

router.get('/:lectureId/chapters', lectureController.getLectureChapters);

router.get('/:lectureId/dashboard', lectureController.getLectureStudentResults);

module.exports = router;
