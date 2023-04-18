'use strict';
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');
const studentController = require('../controllers/studentController');
const { checkPermission } = require('../middleware/check-permission');
const { body } = require('express-validator');
const Student = require('../models/student');
const router = require('express').Router();
router.get('/', studentController.getStudents);

router.get('/:studentId/edit', studentController.getStudent);

router.put(
	'/:studentId',
	[
		body('id')
			.isInt()
			.withMessage('Invalid id')
			.custom(async (value) => {
				const isExist = await Student.findByPk(value);
				if (isExist) {
					throwError(`id already exists`, 404);
				}
			}),
		body('fullname').trim().notEmpty(),
		body('dob')
			.trim()
			.notEmpty()
			.isISO8601()
			.isDate()
			.withMessage('Invalid format'),
	],
	studentController.putStudent
);
module.exports = router;
