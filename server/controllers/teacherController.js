const { Op } = require('sequelize');
const Class = require('../models/class');
const Lecture = require('../models/lecture');
const Teacher = require('../models/teacher');
const {
	errorResponse,
	successResponse,
	throwError,
} = require('../util/helper');
const sequelize = require('../util/database');

exports.getClasses = async (req, res, _) => {
	try {
		const search = req.query.search;
		const user = await Teacher.findOne({
			where: {
				accountId: req.account.id,
			},
		});
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

			const [total] = await sequelize.query(
				`
			
				SELECT 	COUNT(classes.id) as id
			
				FROM	classes
				JOIN	lectures
				ON		lectures.id = classes.lectureId
				JOIN	teachers
				ON		teachers.id = classes.teacherId
				WHERE	(classes.id LIKE "${search}%"
				OR		classes.name LIKE "${search} %")
				AND		teachers.id = "${user.id}"
			`,
				{
					type: sequelize.QueryTypes.SELECT,
				}
			);
			return successResponse(res, 200, {
				data: classrooms,
				total: total.id,
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

		const total = await Class.count({ where: { teacherId: user.id } });
		successResponse(res, 200, { data: classes, total });
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClass = async (req, res, _) => {
	try {
		const user = await Teacher.findOne({
			where: {
				accountId: req.account.id,
			},
		});
		const { classId } = req.params;
		const [foundedClass] = await user.getClasses({
			where: { id: classId },
			include: [
				{ model: Teacher, attributes: ['id', 'fullname'] },
				{ model: Lecture, attributes: ['id', 'name', 'credits'] },
			],
			attributes: ['year', 'id', 'name', 'semester'],
		});
		if (!foundedClass) {
			return throwError('Class not found', 404);
		}
		console.log(foundedClass.toJSON());
		return successResponse(res, 200, foundedClass);
	} catch (error) {
		errorResponse(res, error);
	}
};
