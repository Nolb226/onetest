const router = require('express').Router();

const teachController = require('../controllers/teachController');
// const { route } = require('./auth');
router.get('/:lectureId', teachController.getLectureAccount);
router.post('/', teachController.postTeach)
router.delete('/', teachController.deleteLectureAccount);

module.exports = router;
