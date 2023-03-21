const router = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
router.get('/login', authController.login);

router.post(
	'/signup',
	[
		body('password')
			.notEmpty()
			.trim()
			.isLength({ min: 8 })
			.withMessage('Password need to be at least 8 characters long'),
		body('username').notEmpty().trim(),
	],

	//min : 8
	authController.signup
);

module.exports = router;
