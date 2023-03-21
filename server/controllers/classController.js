const { validationResult } = require('express-validator');

const Classes = require('../models/class');
const classDetails = require('../models/classdetail');
const Student = require('../models/student');

//helper
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

exports.getClasses = async (req, res, _) => {
	try {
		const page = req.query.page || 1;
		const pageSize = 5;
		const classes = await Classes.findAndCountAll({
			offset: pageSize * (page - 1),
			limit: pageSize,
		});
		const { rows: result, count: total } = classes;
		successResponse(res, 200, { classes: result, total });
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.getClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const foundedClass = await Classes.findByPk(classId);
		if (!foundedClass) {
			throwError('Class not found', 404);
		}
		successResponse(res, 200, foundedClass);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getAllStudent = async (req, res, _) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const messages = errors
				.array()
				.map((err) => err.msg)
				.join(',');
			throwError(messages, 400);
		}
		const { classId } = req.params;

		const classroomIsExist = await Classes.findByPk(classId);
		if (!classroomIsExist) {
			throwError(`Can't find classroom with that id`, 404);
		}

		const studentInClass = await Student.findAndCountAll({
			include: { model: classDetails, where: { classId } },
		});

		const { rows: students, count: total } = studentInClass;

		successResponse(res, 200, { students, total });
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.findStudentInClass = async (req, res, _) => {
	try {
		const { classId, studentId } = req.params;
		const student = await Student.findByPk(studentId, {
			include: { model: classDetails, where: { classId } },
		});
		if (!student) {
			throwError('Student not found', 404);
		}
		const { id, fullname, dob, majorId } = student;

		successResponse(res, 200, { id, fullname, dob, majorId });
	} catch (error) {
		errorResponse(res, error);
	}
};
