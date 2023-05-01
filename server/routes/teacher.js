const router = require('express').Router();

const teacherController = require('../controllers/teacherController');
const { isAuth } = require('../middleware/is-auth');

router.use(isAuth);

router.get('/classes', teacherController.getClasses);

module.exports = router;
