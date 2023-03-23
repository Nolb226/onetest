const classController = require('../controllers/classController');

const router = require('express').Router();
const multer = require('multer');
const { body } = require('express-validator');

//METHOD : GET

/*
*admin
GET /classes/
get all classes 
*/
router.get('/', classController.getClasses);

/* 
*admin
GET /classes/{classId}
get specific class 
*/
router.get('/:classId', classController.getClass);

/* 
*teacher
GET /classes/{classId}/students
get all students from the current class 
*/
router.get('/:classId/students', classController.getAllStudent);

/* 
*teacher
GET /classes/{classId}/student/{studentId}
get specific students from the current class 
*/
router.get('/:classId/student/:studentId', classController.getStudentInClass);

//METHOD : POST

router.put(
	'/:classId',
	[
		body('name').notEmpty().trim(),
		body('password').notEmpty().trim(),
		body('semester')
			.trim()
			.notEmpty()
			.isInt()
			.withMessage('must be a number')
			.isIn([1, 2, 3])
			.withMessage('value is not correct '),
		body('year')
			.trim()
			.notEmpty()
			.isISO8601()
			.withMessage('must be in ISO8601 format')
			.isDate()
			.withMessage('invalid day received'),
		// .withMessage('must be a date'),
		body('isLock').notEmpty().trim().isIn([true, false]),
	],
	classController.putClass
);

router.put('/:classId/students', classController.putClassStudent);

router.delete('/:classId/', classController.deleteClass);
module.exports = router;
