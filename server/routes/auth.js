const router = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
router.get('/login', authController.login);

router.post(
	'/signup',
	// [body('password').isLength({ min: 8 })],
	//min : 8
	authController.signup
);

module.exports = router;
