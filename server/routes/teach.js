const router = require('express').Router();

const teachController = require('../controllers/teachController');
const { route } = require('./auth');
router.get('/:lectureId', teachController.getLectureAccount);
router.delete('/', teachController.deleteLectureAccount);
router.post('/', teachController.postTeach)

module.exports = router;
