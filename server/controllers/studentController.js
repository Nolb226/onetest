const { validationResult } = require('express-validator');
const Student = require('../models/student');
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

module.exports.getStudents = async (req, res) => {
	try {
		const classObj = req.class;
		const students = await classObj.getStudents();
		successResponse(res, 200, students);
	} catch (error) {
		errorResponse(res, error);
	}
};

module.exports.getStudent = async (req, res) => {
	try {
		const { studentId } = req.params;
		const student = await Student.findByPk(studentId);
		if (!student) {
			return throwError('Student not found', 404);
		}

		return successResponse(res, 200, student);
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.putStudent = async (req, res) => {
	try {
		const errors = validationResult(req.body);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 400);
		}
		const { studentId } = req.params;
		const student = await Student.findByPk(studentId);
		if (!student) {
			throwError(`Student ${studentId} not found`, 404);
		}
		const { id, fullname, dob } = req.body;
		await student.update({
			id,
			fullname,
			dob,
		});
		successResponse(res, 200, _, req.method);
	} catch (error) {}
};
