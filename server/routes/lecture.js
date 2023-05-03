const router = require('express').Router();
const lectureController = require('../controllers/lectureController');
const { isAuth } = require('../middleware/is-auth');
const { isWho } = require('../middleware/is-who');
router.get('/', lectureController.getLectures);
router.get('/user', isAuth, lectureController.getLecturesUser);

// router.get('/:lectureId', lectureController.getLecture);

// router.get('/:lectureId/chapters', lectureController.getLectureChapters);

router.get('/:lectureId/dashboard', lectureController.getLectureStudentResults);

module.exports = router;