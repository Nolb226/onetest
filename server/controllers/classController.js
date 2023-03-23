'use strict';
const { validationResult } = require('express-validator');
// const Excel = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const Classes = require('../models/class');
const classDetails = require('../models/classdetail');
const Student = require('../models/student');

//helper
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');
const dayjs = require('dayjs');
const { log } = require('console');
const deleteExcel = function (filePath) {
	const file = path.join(__dirname, '..', filePath);
	console.log(file);
	fs.unlink(file, (err) => console.log(err));
};

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
		foundedClass.test();
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
		const studentsInClass = await classroomIsExist.getStudents();
		successResponse(res, 200, studentsInClass);

		successResponse(res, 200, a);
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.getStudentInClass = async (req, res, _) => {
	try {
		const { classId, studentId } = req.params;
		const classroom = await Classes.findByPk(classId);
		if (!classroom) {
		}

		const studentsInClass = await classroom.getStudents({
			where: { id: studentId },
		});
		successResponse(res, 200, { student: studentsInClass });

		// successResponse(res, 200, { id, fullname, dob, majorId });
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.postClass = async (req, res, _) => {
	const { classId } = req.params;
	const classInDB = await Classes.findByPk(classId);
	if (!classInDB) {
	}
};

exports.putClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classFounded = await Classes.findByPk(classId);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const messages = errors
				.array()
				.map(function (error) {
					return `${error.param}: ${error.msg}`;
				})
				.join(', ');

			throwError(messages, 409);
		}

		const { name, password, semester, year, isLock } = req.body;
		if (!classFounded) {
			throwError('Class not found', 404);
		}
		await classFounded.update({
			name,
			password,
			semester,
			year,
			isLock,
		});

		successResponse(res, 201, classFounded, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.putClassStudent = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classIsFound = await Classes.findByPk(classId);
		if (!classIsFound) {
			throwError('Class not found', 404);
		}
		const file = req.file;
		const filePath = file.path;
		const workbook = XLSX.readFile(
			// path.join(__dirname, '..', 'excels/Book1.xlsx')
			filePath
		);
		let worksheet = {};
		worksheet['Sheet1'] = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']);
		const data = worksheet.Sheet1;
		data.forEach(async (student, number) => {
			const cuttedDOB = student['ngày sinh'].split('/');
			const year = cuttedDOB[2];
			const month = cuttedDOB[1];
			const day = cuttedDOB[0];
			await classIsFound.createClassStudent({
				id: student['MSSV'],
				dob: new Date(year, month, day),
				fullname: student['Tên'] || student['Họ tên'],
				foreignKey: student['chuyên ngành'],
			});
		});

		successResponse(res, 200, data);
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.deleteClass = async (req, res, _) => {
	const { classId } = req.params;
	const classFounded = await Classes.findByPk(classId);
	if (!classFounded) {
		throwError('Class not found', 404);
	}

	await classFounded.destroyClass();
	successResponse(res, 200, {}, 'DELETE');
};
