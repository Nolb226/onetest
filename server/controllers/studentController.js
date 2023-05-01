const { validationResult } = require('express-validator');
const Student = require('../models/student');
const Class = require('../models/class');
const Lecture = require('../models/lecture');
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');
const Teacher = require('../models/teacher');
const classDetails = require('../models/classdetail');

exports.getStudents = async (req, res) => {
	try {
		const classObj = req.class;
		const students = await classObj.getStudents();
		successResponse(res, 200, students);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getStudent = async (req, res) => {
	try {
		const { studentId } = req.params;
		const student = await Student.findByPk(studentId);
		if (!student) {
			return throwError('Student not found', 404);
		}

		return successResponse(res, 200, student);
	} catch (error) {
		errorResponse(res, error);
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

exports.getClasses = async (req, res, _) => {
	try {
		const search = req.query.search;
		const user = await Student.findOne({
			where: {
				accountId: req.account.id,
			},
		});

		if (!user) {
			throwError(`Could not find student`, 404);
		}

		if (!req.account.isActive) {
			return successResponse(res, 200, {}, 'GET');
		}
		if (search && search !== '') {
			const page = req.query.page || 1;
			const pageSize = 10;
			console.log(req.query.search);
			const classrooms = await user.getClasses({
				where: {
					[Op.or]: [
						{
							id: {
								[Op.like]: search + '%',
							},
						},
						{
							name: {
								[Op.like]: search + ' %',
							},
						},
					],
				},
				include: [
					{ model: Teacher, attributes: ['id', 'fullname'] },
					{ model: Lecture, attributes: ['id', 'name'] },
				],
				attributes: ['id', 'name', 'isLock'],
				offset: pageSize * (page - 1),
				limit: pageSize,
			});
			const total = await sequelize.query(
				`
			
				SELECT 	COUNT(classes.id) as id
			
				FROM	classes
				JOIN	classdetail
				ON		classdetail.classId = classes.id
				WHERE	(classes.id LIKE "${search}%"
				OR		classes.name LIKE "${search} %")
				AND		studentId = "${user.id}"
			`,
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			return successResponse(res, 200, {
				data: classrooms,
				total: total[0].id,
			});
		}
		const page = req.query.page || 1;
		const pageSize = 10;

		const classes = await user.getClasses({
			include: [
				{ model: Teacher, attributes: ['id', 'fullname'] },
				{ model: Lecture, attributes: ['id', 'name'] },
			],
			attributes: ['id', 'name', 'isLock', 'year', 'semester', 'totalStudent'],
			offset: pageSize * (page - 1),
			limit: pageSize,
		});
		let total;
		total = await classDetails.count({ where: { studentId: user.id } });
		successResponse(res, 200, { data: classes, total });
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.getClassNotify = async (req, res, _) => {
	try {
		const user = await Student.findOne({
			where: {
				accountId: req.account.id,
			},
		});
		if (!user) {
			throwError(`There's no user with id ${req.account.id}`, 404);
		}
		const notify = await sequelize.query(
			`
			SELECT	*
			FROM	students
			JOIN	classdetail
			ON		classdetail.studentId = students.id
			JOIN	classes
			ON		classes.id = classdetail.classId
			JOIN	notifications
			ON		notifications.classId = classes.id
			WHERE	students.id = "${user.id}"
			`,
			{
				type: QueryTypes.SELECT,
			}
		);

		successResponse(res, 200, notify);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};
