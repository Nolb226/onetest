'use strict';
const { validationResult } = require('express-validator');
// const Excel = require('exceljs');
const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
const Classes = require('../models/class');
const bycrypt = require('bcryptjs');

const pdfmake = require('pdfmake');

const classDetails = require('../models/classdetail');
const Chapter = require('../models/chapter');

//helper
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

const Lecture = require('../models/lecture');
const Student_Result = require('../models/student_result');
const Exam = require('../models/exam');
const Class = require('../models/class');
const e = require('express');
const sequelize = require('../util/database');
const { Op, QueryTypes } = require('sequelize');
const Question = require('../models/question');
const Account = require('../models/account');
const { getIO } = require('../util/socket');
const deleteExcel = function (filePath) {
	const file = path.join(__dirname, '..', filePath);
	fs.unlink(file, (err) => console.log(err));
};

exports.getClasses = async (req, res, _) => {
	try {
		const search = req.query.search;
		if (search && search !== '') {
			const page = req.query.page || 1;
			const pageSize = 10;
			// console.log(req.query.search);
			const classrooms = await req.account.getClasses({
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
					{ model: Account, attributes: ['id', 'firstName', 'lastName'] },
					{ model: Lecture, attributes: ['id', 'name'] },
				],
				attributes: ['id', 'name', 'isLock'],
				offset: pageSize * (page - 1),
				limit: pageSize,
			});
			successResponse(res, 200, classrooms);
		}
		const page = req.query.page || 1;
		const pageSize = 10;

		const { account } = req;

		const classes = await sequelize.query(
			`
			SELECT	classes.id,
					classes.name,
					totalStudent,
					lectures.id 									AS lecture_id,
					lectures.name 									AS lecture_name,
					CONCAT(teacher.lastName," ",teacher.firstName) 	as teacher_fullname

			FROM	classes
			JOIN 	lectures ON lectures.id 						= classes.lectureId
			JOIN 	classdetail ON classes.id 						= classdetail.classId
			JOIN 	accounts 										AS student
			ON		classdetail.accountId 							= student.id
			JOIN 	accounts 										AS teacher
			ON		classes.accountId 								= teacher.id
			WHERE	student.id			 							= "${account.id}"
			`,
			{
				type: QueryTypes.SELECT,
			}
		);
		// const teacher = await Account.findByPk(class {});
		const result = {
			data: classes,
			total: 0,
		};
		successResponse(res, 200, result);
	} catch (error) {
		console.log(error);
		errorResponse(res, error, [{}]);
	}
};

exports.getManageClasses = async (req, res, _) => {
	try {
		const search = req.query.search;
		if (search && search !== '') {
			const page = req.query.page || 1;
			const pageSize = 10;
			// console.log(req.query.search);
			const classrooms = await req.account.getClasses({
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
					{ model: Account, attributes: ['id', 'firstName', 'lastName'] },
					{ model: Lecture, attributes: ['id', 'name'] },
				],
				attributes: ['id', 'name', 'isLock'],
				offset: pageSize * (page - 1),
				limit: pageSize,
			});
			successResponse(res, 200, classrooms);
		}
		const page = req.query.page || 1;
		const pageSize = 10;

		const { account } = req;

		const classes = await sequelize.query(
			`
			SELECT	classes.id,
					classes.name,
					classes.isLock,
					totalStudent,
					lectures.id 									AS lecture_id,
					lectures.name 									AS lecture_name

			FROM	classes
			JOIN 	lectures ON lectures.id 						= classes.lectureId
			WHERE	classes.accountId			 						= "${account.id}"
			LIMIT ${(page - 1) * pageSize} ,${pageSize}`,
			{
				type: QueryTypes.SELECT,
			}
		);
		// const teacher = await Account.findByPk(class {});
		const result = {
			data: classes,
			total: classes.length,
		};
		successResponse(res, 200, result);
	} catch (error) {
		console.log(error);
		errorResponse(res, error, [{}]);
	}
};

exports.getClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const [foundedClass] = await req.account.getClasses({
			where: { id: classId },
			include: [
				{ model: Account, attributes: ['id', 'firstName', 'lastName'] },
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

exports.getClassesNotifications = async (req, res, _) => {};

exports.getClassJoin = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const [classrooms] = await sequelize.query(
			`
			SELECT	classes.id,
					classes.name,
					totalStudent,
					isLock,
					lectures.id 		as lecture_id,
					lectures.name 		as lecture_name,
					CONCAT(lastName," ",firstName) as fullname

			FROM	classes
			JOIN	lectures
			ON		lectures.id 		= classes.lectureId
			JOIN	accounts
			ON accounts.id =		classes.accountId
			WHERE		classes.id ="${classId}"
			`,
			{
				type: QueryTypes.SELECT,
			}
		);
		if (!classrooms) {
			return throwError('Class not found', 404);
		}
		console.log(classrooms);
		return successResponse(res, 200, classrooms);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassEdit = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const foundedClass = await Classes.findByPk(classId, {
			attributes: ['id', 'name', 'semester', 'password'],
		});
		// console.log(foundedClass);
		if (!foundedClass) {
			return throwError('Class not found', 404);
		}
		return successResponse(res, 200, foundedClass);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getAllStudent = async (req, res, _) => {
	try {
		const page = req.query.page || 1;
		const perPage = 10;
		const { classId } = req.params;

		const classroom = await Classes.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find class`, 404);
		}
		const students = await classroom.getAccounts({
			attributes: ['account_id', 'id', 'firstName', 'lastName'],
			include: [
				{
					model: Student_Result,
					attributes: ['grade'],
					include: [
						{
							model: Exam,
							where: { classId },
						},
					],
				},
			],
			order: ['firstName', 'account_id'],

			joinTableAttributes: [],
			// raw: true,
			// nest: true,
			offset: (page - 1) * perPage,
			limit: perPage,
		});
		const total = await classDetails.count({ where: { classId } });
		const total_exam = await Exam.count({ where: { classId } });
		const exam_name = await classroom.getExams({
			attributes: ['id', 'examId', 'name'],
		});
		// const students = await Promise.all(
		// 	exam_name.map(async (exam) => {
		// 		const result = await exam.getAccounts({
		// 		attributes: ['account_id', 'id', 'firstName', 'lastName'],
		// 		include: [
		// 		{
		// 			model: Student_Result,
		// 			attributes: ['grade'],
		// 		},
		// 	],
		// 	order: ['account_id'],

		// 	joinTableAttributes: [],
		// 	// raw: true,
		// 	// nest: true,
		// 	offset: (page - 1) * perPage,
		// 	limit: perPage,

		// 		});

		// 		return result;
		// 	})
		// );
		console.log(students);
		const results = await Promise.all(
			exam_name.map(async (exam) => {
				const result = await exam.getStudentresults({});
				// delete exam.toJSON().id;
				// console.log(result);
				return result;
			})
		);
		const data = {
			exam_name,
			class_name: classroom.name,
			data: students,
			total,
			total_exam,
			results,
		};
		// data.totals = totals;
		return successResponse(res, 200, data);
	} catch (error) {
		errorResponse(res, error, []);
	}
};

exports.getStudentInClass = async (req, res, _) => {
	try {
		const { classId, studentId } = req.params;
		const classroom = await Classes.findByPk(classId);
		if (!classroom) {
			throwError(`Couldn't find classroom`, 404);
		}

		const [studentsInClass] = await classroom.getAccounts({
			where: { id: studentId },
			joinTableAttributes: [],
		});
		if (!studentsInClass) {
			throwError(`Couldn't find student`, 404);
		}
		successResponse(res, 200, studentsInClass);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassesExams = async (req, res, _) => {
	try {
		const page = req.query.page || 1;
		const perPage = 10;
		const exams = await sequelize.query(
			`
			SELECT   	classes.id as class_id,
						lectures.name as lecture_name,
						exams.name,
						exams.id,
						exams.isLock,
						exams.examId

			FROM      	classes
			JOIN		exams
			ON 			classes.id = exams.classId
			JOIN      	lectures
			ON 			classes.lectureId = lectures.id
			WHERE 		classes.accountId = "${req.account.id}"
			LIMIT 		${perPage}
			OFFSET 		${perPage * (page - 1)}
		`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		const result = await Promise.all(
			exams.map(async (exam) => {
				const totals = await Student_Result.count({
					where: { [Op.and]: [{ examId: exam.id }, { isDone: true }] },
				});
				return { ...exam, totals };
			})
		);

		successResponse(res, 200, result);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassExams = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const { sort } = req.query;
		const exams = await sequelize.query(
			`
				SELECT	exams.id,
						exams.duration,
						exams.examId 				as exam_id,
						exams.name 					as exam_name,
						lectures.name 				as lecture_name,
						isDone,
						totalQuestions,
						exams.isLock,
						timeStart,
						timeEnd
						
				FROM	lectures
				JOIN	classes
				ON 		classes.lectureId 			= lectures.id
				JOIN	exams
				ON		classes.id 					= exams.classId
				JOIN	studentresults
				ON		exams.id 					= studentresults.examId
				JOIN	accounts
				ON		accounts.id 				= studentresults.accountId
				WHERE	classes.id 					= "${classId}"
				AND		accounts.id 				= "${req.account.id}"
				${sort !== '' ? `AND		studentresults.isDone		= "${sort}"` : ''}

			`,
			{
				type: QueryTypes.SELECT,
			}
		);
		successResponse(res, 200, exams);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassExamsResult = async (req, res, _) => {
	try {
		const { classId } = req.params;

		const classroom = await Class.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find class`, 404);
		}
		const studentresults = await classroom.getAccounts({
			include: [
				{
					model: Exam,
					attributes: ['id', 'name'], //tên các field cần lấy
					through: {
						attributes: ['grade', 'content'], //tên các field cần lấy
					},
				},
			],
			attributes: ['dob', 'id', 'firstName', 'lastName'], //tên các field cần lấy
			joinTableAttributes: [],
		});

		successResponse(res, 200, studentresults);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.getClassExam = async (req, res, _) => {
	try {
		const { classId, examId } = req.params;
		const { sort } = req.query;

		const user = await Account.findOne({
			where: {
				id: req.account.id,
			},
		});

		console.log(user);

		const [result] = await sequelize.query(
			`
				SELECT	lectures.name as lecture_name,
				CONCAT(accounts.lastName," ",accounts.firstName) AS fullname,
						exams.name as exam_name,
						exams.examId as exam_id,
						exams.duration,
						totalQuestions,
						clickedOutside,
						grade,
						content,
						isDone

				FROM	lectures
				JOIN	classes
				ON		lectures.id 				= classes.lectureId
				JOIN	exams
				ON		classes.id 					= exams.classId
				JOIN 	studentresults
				ON		studentresults.examId 		= exams.id
				JOIN	accounts
				ON		studentresults.accountId 	= accounts.id
				WHERE	classes.id 					= "${classId}"
				AND		exams.id					= "${examId}"
				AND		accounts.id 				= "${user.id}"

			`,
			{
				type: QueryTypes.SELECT,
			}
		);
		if (!result.isDone) {
			throwError(`Result is empty`);
		}

		const content = JSON.parse(result.content);

		const correct = content.reduce((acc, question) => {
			if (question.studentAns === question.correctAns) {
				return acc + 1;
			}
			return acc;
		}, 0);
		console.log(content.length);
		const wrong = result.totalQuestions - correct;
		result.content = null;
		result.correct = correct;
		result.wrong = wrong;
		successResponse(res, 200, result);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassExamStudentResults = async (req, res, _) => {
	try {
		const { examId } = req.params;
		const exam = await Exam.findByPk(examId);
		const studentresults = await exam.getAccounts({
			attributes: [
				'id',
				'account_id',
				'dob',
				[
					sequelize.fn(
						'CONCAT',
						sequelize.col('lastName'),
						' ',
						sequelize.col('firstName')
					),
					'fullname',
				],
			],
			order: [['firstName', 'ASC']],
			through: {
				where: {
					isDone: true,
				},
			},
			joinTableAttributes: ['grade', 'clickedOutside'],
			// through: { attributes: ['grade', 'clickedOutside'] }, //tên các field cần lấy, through: gọi bản chi tiết
		});
		const results = {
			students: studentresults,
			examId: exam.examId,
		};

		successResponse(res, 200, results);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getStudentResultInClass = async (req, res, _) => {
	try {
		const { classId, examId } = req.params;

		const [result] = await sequelize.query(
			`
			SELECT  timeStart, 
					timeEnd, 
					content, 
					isDone,
					TIME_TO_SEC(studentresults.duration) as duration,
					studentresults.id

			FROM	classes
			JOIN	exams
			ON		exams.classId 	= classes.id
			JOIN	studentresults
			ON		exams.id 		= studentresults.examId
			JOIN	accounts
			ON		accounts.id 		= studentresults.accountId
			WHERE	exams.id 		= "${examId}"
			AND		accounts.id		= "${req.account.id}"
			AND		classes.id 		="${classId}"
		`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		const { content: newContent } = result;
		result.content = JSON.parse(newContent);
		console.log(JSON.parse(newContent));
		successResponse(res, 200, result);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.getChaptersInClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classroom = await Class.findByPk(classId);
		const chapters = await Chapter.findAll({
			where: {
				lectureId: classroom.lectureId,
			},
		});
		successResponse(res, 200, chapters);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getQuestionInClassByChapter = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const { chapters } = req.query;

		const classroom = await Class.findByPk(classId);
		const query = chapters
			?.split(',')
			.join(`" OR chapters.id = "${classroom.lectureId}-`);

		console.log(`"${classroom.lectureId}-${query}`);
		const questions = await sequelize.query(
			`
			SELECT  questions.id,
					description,
					correctAns,
					answerA,
					answerB,
					answerC,
					answerD,
					level,
					questions.chapterId

			FROM	classes

			JOIN	lectures
			ON		lectures.id 			= classes.lectureId
			JOIN	chapters
			ON		lectures.id 			= chapters.lectureId
			JOIN	questions
			ON		chapters.id 			= questions.chapterId
			WHERE	(chapters.id 			= "${classroom.lectureId}-${query}")
			AND		classes.id              = "${classId}"

			`,
			{
				type: QueryTypes.SELECT,
			}
		);
		successResponse(res, 200, questions);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.postClass = async (req, res, _) => {
	let file = req.file;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 400);
		}
		const { account } = req;
		const { id, name, password, year, semester, lectureId, accountpassword } =
			req.body;
		const newClass = await account.createClass({
			name,
			password,
			semester,
			year,
			lectureId,
			accountId: account.id,
		});
		console.log(newClass.toJSON());

		// sequelize.query(`INSERT INTO classes VALUES ()`)

		// await user.addClass(newClass);

		if ((file = req.file)) {
			const filePath = await file.path;
			const extname = /xls/.test(path.extname(file.originalname).toLowerCase());

			const workbook = XLSX.readFile(
				// path.join(__dirname, '..', 'excels/Book1.xlsx')
				filePath
			);
			const data = XLSX.utils.sheet_to_json(
				workbook.Sheets[workbook.SheetNames[0]]
			);

			console.log(data);
			await Promise.all(
				data.map(async (student, number) => {
					const cuttedDOB = student['ngày sinh']?.split('/') || new Date();
					const year = cuttedDOB[2];
					const month = cuttedDOB[1];
					const day = cuttedDOB[0];
					console.log(student['Mã lớp'].slice(0, 3));
					await newClass.createAccount({
						password: await bycrypt.hash(accountpassword, 10),
						account_id: student['MSSV'] || student['Mã sinh viên'],
						dob: new Date(year, month, day) || new Date(),
						firstName: student['Tên'],
						lastName: student['Họ lót'],
						type: 'SV',
						majorId:
							student['chuyên ngành'] ||
							student['Chuyên ngành'] ||
							student['Mã lớp'].slice(0, 3),
					});
				})
			);

			const newTotal = await classDetails.count({
				where: { classId: newClass.id },
			});
			await newClass.update({
				totalStudent: newTotal,
			});
			deleteExcel(filePath);
		}

		successResponse(res, 201, {}, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.postClassExam = async (req, res) => {
	try {
		// const errors = validationResult(req.body);
		// if (!errors.isEmpty()) {
		//    throwError(errors.array(), 409);
		// }
		const { classId } = req.params;
		const classroom = await Class.findByPk(classId);
		const {
			type,
			examId,
			name,
			timeStart,
			timeEnd,
			duration,
			totalQuestions,
			easy,
			hard,
			questions,
		} = req.body;
		const exam = await classroom.createExam({
			type,
			examId,
			name,
			timeStart,
			timeEnd,
			duration,
			easy,
			hard,
			totalQuestions,
		});
		const [student, created] = await Account.findOrCreate({
			where: {
				id: 0,
			},
			defaults: {
				id: 0,
				firstName: '',
				lastName: '',
				dob: new Date(),
				password: '',
				email: '',
				account_id: 0,
			},
		});
		const students = await classroom.getAccounts();
		const questionList = JSON.parse(questions);
		if (type === '0') {
			console.log('Đây nè');
			try {
				const [chapter, created] = await Chapter.findOrCreate({
					where: {
						[Op.and]: [
							{
								lectureId: classroom.lectureId,
							},
							{
								name: 'Chương chung',
							},
						],
					},
					defaults: {
						lectureId: classroom.lectureId,
						id: `${classroom.lectureId}-0`,
						name: 'Chương chung',
						numberOfQuestions: 0,
					},
				});
				console.log(3);

				const newQuestions = await Promise.all(
					questionList.map(async (question) => {
						const createdQuestion = await chapter.createQuestion(question);

						return {
							id: createdQuestion.id,
							description: createdQuestion.description,
							answerA: createdQuestion.answerA,
							answerB: createdQuestion.answerB,
							answerC: createdQuestion.answerC,
							answerD: createdQuestion.answerD,
						};
					})
				);
				console.log(2);

				const total = await Question.count({
					where: { chapterId: chapter.id },
				});
				await chapter.update({
					numberOfQuestions: total,
				});
				const result = await Promise.all(
					students.map(async (student) => {
						console.log(student);
						return await student.addExam(exam, {
							through: {
								duration: duration * 60,

								content: newQuestions,
							},
						});
					})
				);
				await student.addExam(exam, {
					through: {
						duration: duration * 60,
						content: newQuestions,
					},
				});
				getIO().to(`${classId}`).emit('exam:created', exam);
				// getIO().emit("create-exam", exam.id);
				successResponse(res, 200, result);
			} catch (error) {
				console.log(error);
				throwError(error);
			}
		}

		if (type === '1') {
			// const { chapters } = req.query;

			// const query = chapters
			// 	?.split(',')
			// 	.join(`" OR chapters.id = "${classroom.lectureId}-`);
			const newQuestions = JSON.parse(questions);
			try {
				const examContent = await Promise.all(
					newQuestions.map(async (question) => {
						const chapter = await Question.findByPk(question.id);
						return {
							id: chapter.id,
							description: chapter.description,
							answerA: chapter.answerA,
							answerB: chapter.answerB,
							answerC: chapter.answerC,
							answerD: chapter.answerD,
						};
					})
				);
				const result = await Promise.all(
					students.map(async (student) => {
						try {
							return await student.addExam(exam, {
								through: { content: examContent },
							});
						} catch (error) {
							console.log(error);
						}
					})
				);
				await student.addExam(exam, {
					through: { content: examContent },
				});
				successResponse(res, 200, result);
			} catch (error) {
				console.log(error);
				errorResponse(res, error);
			}
		}

		if (type === '2') {
			const { chapters } = req.query;
			const query = chapters
				?.split(',')
				.join(`" OR chapters.id = "${classroom.lectureId}-`);

			const content = await sequelize.query(
				`
			SELECT * FROM (
				(
					SELECT  questions.id,
							description,
							answerA,
							answerB,
							answerC,
							answerD,
							difficulty

					FROM	exams
					JOIN	classes
					ON		exams.classId 			= classes.id
					JOIN	lectures
					ON		lectures.id 			= classes.lectureId
					JOIN	chapters
					ON		lectures.id 			= chapters.lectureId
					JOIN	questions
					ON		chapters.id 			= questions.chapterId
					WHERE	chapters.id 			= "${query}"
					AND		questions.level 		= 0
					AND		questions.deletedAt	IS NULL
					LIMIT	${easy}

				)
					UNION ALL
				(
					SELECT  questions.id,
							description,
							answerA,
							answerB,
							answerC,
							answerD,
							difficulty

					FROM	exams
					JOIN	classes
					ON		exams.classId 			= classes.id
					JOIN	lectures
					ON		lectures.id 			= classes.lectureId
					JOIN	chapters
					ON		lectures.id 			= chapters.lectureId
					JOIN	questions
					ON		chapters.id 			= questions.chapterId
					WHERE	chapters.id 			= "${query}"
					AND		questions.level	 		= 1
					AND		questions.deletedAt	IS NULL
					LIMIT	${hard}
				)
			) as q
			ORDER BY RAND()

			`,
				{ type: sequelize.QueryTypes.SELECT }
			);
			const result = await Promise.all(
				students.map(async (student) => {
					return await student.addExam(exam, {
						through: { content },
					});
				})
			);
			await student.addExam(exam, {
				through: { content },
			});

			successResponse(res, 200, result);
			return;
		}
		if (type === '3') {
			const { chapters } = req.query;
			const query = chapters
				?.split(',')
				.join(`" OR chapters.id = "${classroom.lectureId}-`);
			const result = await Promise.all(
				students.map(async (student) => {
					const content = await sequelize.query(
						`
					SELECT * FROM (
						(
							SELECT  questions.id,
									description,
									answerA,
									answerB,
									answerC,
									answerD,
									difficulty

							FROM	exams
							JOIN	classes
							ON		exams.classId 			= classes.id
							JOIN	lectures
							ON		lectures.id 			= classes.lectureId
							JOIN	chapters
							ON		lectures.id 			= chapters.lectureId
							JOIN	questions
							ON		chapters.id 			= questions.chapterId
							WHERE	chapters.id 			= "${query}"
							AND		questions.level 		= 0
							AND		questions.deletedAt	IS NULL
							LIMIT	${easy}

						)
							UNION ALL
						(
							SELECT  questions.id,
									description,
									answerA,
									answerB,
									answerC,
									answerD,
									difficulty

							FROM	exams
							JOIN	classes
							ON		exams.classId 			= classes.id
							JOIN	lectures
							ON		lectures.id 			= classes.lectureId
							JOIN	chapters
							ON		lectures.id 			= chapters.lectureId
							JOIN	questions
							ON		chapters.id 			= questions.chapterId
							WHERE	chapters.id 			= "${query}"
							AND		questions.level	 		= 1
							AND		questions.deletedAt	IS NULL
							LIMIT	${hard}
						)
					) as q
					ORDER BY RAND()

					`,
						{ type: sequelize.QueryTypes.SELECT }
					);

					await Promise.all(
						chapters
							.split(',')
							.map(async (chapterNumber) =>
								exam.addChapters(await chapters.findByPk(chapterNumber))
							)
					);
					await student.addExam(exam, {
						through: { content },
					});
					successResponse(res, 200, _, req.method);
					return;
				})
			);

			successResponse(res, 200, result);
			return;
		}
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.postClassStudent = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const { password } = req.body;

		const foundedClass = await Classes.findByPk(classId);
		if (!foundedClass) {
			throwError(`Could not find class`, 404);
			0;
		}

		const [isDuplicate] = await sequelize.query(
			`

		SELECT	*
		FROM	classdetail
		WHERE	classId LIKE "${foundedClass.lectureId}${(foundedClass.year + '').slice(
				-2
			)}${foundedClass.semester}%"
		AND		accountId = "${req.account.id}"

		`,
			{
				type: QueryTypes.SELECT,
			}
		);

		if (isDuplicate) {
			console.log(isDuplicate);
			throwError(`Could not join`, 409);
		}

		const isValid = password === foundedClass.password;
		console.log(isValid);
		if (!isValid || foundedClass.isLock) {
			throwError(`Could not join class`, 409);
		}
		await foundedClass.addAccount(req.account);

		const newTotal = await classDetails.count({
			where: { classId: foundedClass.id },
		});
		foundedClass.totalStudent = newTotal;
		await foundedClass.save();
		const exams = await foundedClass.getExams();
		// console.log(exams);
		await Promise.all(
			exams.map(async (exam) => {
				console.log(exam.toJSON());
				if (exams.type != 3) {
					const studentDumb = await Student_Result.findOne({
						where: {
							accountId: 0,
						},
					});
					console.log('|||||||');
					const duration = exam.duration * 60;
					return await req.account.addExam(exam, {
						through: {
							duration,
							content: studentDumb.content,
						},
					});
				} else {
					const chapters = await exam.getChapters();
					const query = chapters
						.map((chapter) => chapter.id)
						.join('" OR chapters.id = "');
					const content = await sequelize.query(
						`
					SELECT * FROM (
						(
							SELECT  questions.id,
									description,
									answerA,
									answerB,
									answerC,
									answerD,
									difficulty

							FROM	exams
							JOIN	classes
							ON		exams.classId 			= classes.id
							JOIN	lectures
							ON		lectures.id 			= classes.lectureId
							JOIN	chapters
							ON		lectures.id 			= chapters.lectureId
							JOIN	questions
							ON		chapters.id 			= questions.chapterId
							WHERE	chapters.id 			= "${query}"
							AND		questions.level 		= 0
							AND		questions.deletedAt	IS NULL
							LIMIT	${exam.easy}

						)
							UNION ALL
						(
							SELECT  questions.id,
									description,
									answerA,
									answerB,
									answerC,
									answerD,
									difficulty

							FROM	exams
							JOIN	classes
							ON		exams.classId 			= classes.id
							JOIN	lectures
							ON		lectures.id 			= classes.lectureId
							JOIN	chapters
							ON		lectures.id 			= chapters.lectureId
							JOIN	questions
							ON		chapters.id 			= questions.chapterId
							WHERE	chapters.id 			= "${query}"
							AND		questions.level	 		= 1
							AND		questions.deletedAt	IS NULL
							LIMIT	${exam.hard}
						)
					) as q
					ORDER BY RAND()

					`,
						{ type: sequelize.QueryTypes.SELECT }
					);
					const duration = exam.duration * 60;

					return await req.account.addExam(exam, {
						through: {
							duration,

							content: content,
						},
					});
				}
			})
		);

		successResponse(res, 201, req.account, req.method);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.postClassStudentExam = async (req, res, _) => {
	try {
		const { examId, classId } = req.params;
		const classroom = await Classes.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find classroom`, 404);
		}

		const { questions } = req.body;
		const studentresults = await Student_Result.findOne({
			where: { accountId: req.account.id, examId },
		});
		const exam = await Exam.findByPk(examId);
		const { content } = studentresults;
		let grade = 0;
		const newContent = await Promise.all(
			content.map(async (question) => {
				const isIn = questions.findIndex((object) => object.id === question.id);
				const questionInBank = await Question.findByPk(question.id, {
					attributes: [
						'id',
						'correctAns',
						'answerA',
						'answerB',
						'answerC',
						'answerD',
					],
				});
				if (isIn !== -1) {
					if (questionInBank.correctAns === questions[isIn].studentAns) {
						grade += 10 / exam.totalQuestions;
					}

					console.log(questionInBank.toJSON());
					return {
						...questionInBank.toJSON(),
						...questions[isIn],
					};
				}
				return {
					...questionInBank.toJSON(),
					studentAns: 'Bỏ',
				};
			})
		);

		const test = await studentresults.update({
			content: newContent,
			grade,
			isDone: true,
		});
		successResponse(res, 200, test, 'POST');
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.postExamPDF = async (req, res, _) => {
	try {
		const font = {
			Roboto: {
				normal: path.join(__dirname, '..', 'fonts/Roboto-Regular.ttf'),
				bold: path.join(__dirname, '..', 'fonts/Roboto-Medium.ttf'),
				italics: path.join(__dirname, '..', 'fonts/Roboto-Italic.ttf'),
				bolditalics: path.join(
					__dirname,
					'..',
					'fonts/Roboto-MediumItalic.ttf'
				),
			},
		};

		const printer = new pdfmake(font);
		const { examId } = req.params;
		const { student, accountId } = req.body;

		const [result] = await sequelize.query(
			`
			SELECT 	SEC_TO_TIME(exams.duration*60 - TIME_TO_SEC(studentresults.duration)) as duration,
		classes.id as class_id,
        lectures.name as lecture_name,
        DATE_FORMAT(exams.timeStart, "%d/%m/%y %H:%i:%s") as timeStart,
       	DATE_FORMAT(exams.timeEnd, "%d/%m/%y %H:%i:%s") as timeEnd,
        easy,
        hard,
        content,
		totalQuestions,
		exams.examId as examId

FROM	lectures
JOIN	classes
ON		classes.lectureId = lectures.id
JOIN	exams
ON		exams.classId = classes.id
JOIN	studentresults	ON studentresults.examId = exams.id
JOIN	accounts as teacher ON teacher.id = classes.accountId
JOIN	accounts as student	ON student.id = studentresults.accountId
WHERE
	student.id = "${student}" AND exams.id = "${examId}" 
			`,
			{
				type: QueryTypes.SELECT,
			}
		);

		const { content: questions } = result;
		console.log(result);

		const content = JSON.parse(questions).map((question, index) => {
			return [
				{
					text: [
						{ text: `Câu ${index + 1}: ` },
						{ text: `${question.description}` },
					],
					style: 'header',
					margin: [0, 15],
				},
				{
					type: 'none',
					ul: [
						{
							text: `A. ${question.answerA}`,
							color: question.correctAns === 'A' ? '#2f9e44' : '#1d1d1f',
						},
						{
							text: `B. ${question.answerB}`,
							color: question.correctAns === 'B' ? '#2f9e44' : '#1d1d1f',
						},
						{
							text: `C. ${question.answerC}`,
							color: question.correctAns === 'C' ? '#2f9e44' : '#1d1d1f',
						},
						{
							text: `D. ${question.answerD}`,
							color: question.correctAns === 'D' ? '#2f9e44' : '#1d1d1f',
						},
					],
				},
			];
		});

		const docDef = {
			watermark: {
				text: `Best of Test - BoT`,
				color: '#161F80',
				opacity: 0.2,
				bold: true,
			},
			header: '',
			footer: {
				width: '100%',
				background: '#161F80',

				columns: [
					{
						width: '100%',
						text: 'Tất cả bản quyền thuộc về Group5 ( Best of Test - BoT )',
						lineHeight: 1.2,
						color: '#f5f5f7',
					},
				],
				margin: [0, 20, 0, 0],
				stack: [
					{
						canvas: [
							{
								type: 'rect',
								x: 0,
								y: 0,
								w: 595.28,
								h: 50,
								color: '#161F80',
							},
						],
					},
				],
			},

			content: [
				{
					columns: [
						{
							image: './logo-no-background.png',
							fit: [100, 200],
							alignment: 'right',
							width: 'auto',
						},
						{
							type: 'none',
							ul: [
								`Mã lớp: ${result.class_id}`,
								`Môn: ${result.lecture_name}`,
								`Tổng số câu hỏi :${result.totalQuestions}`,
								`Thời gian bắt đầu: ${result.timeStart}`,
								`Thời gian làm bài: ${result.duration}`,
								`Độ khó: ${result.easy} Dễ / ${result.hard} Khó`,
							],
							lineHeight: 1.6,
							margin: [-10, 0, 0, 0],
							width: 'auto',
						},
						{
							qr: `${process.env.FRONTEND || 'localhost'}:3000`,
							fit: 70,
							alignment: 'right',
							width: 'auto',
						},
					],
					columnGap: 20,
				},

				{
					text: 'Đáp án',
					fontSize: 14,
					bold: true,
					alignment: 'center',
					margin: [0, 30, 50, 0],
				},

				content,
			],
			styles: {
				header: {
					bold: true,
					fontSize: 12,
				},
			},
			defaultStyle: {
				color: '#1d1d1f',
				fontSize: 12,
			},
			background: function (curPage, pageSize) {
				return {
					canvas: [
						{
							type: 'rect',
							x: 0,
							y: 0,
							w: pageSize.width,
							h: pageSize.height,
							color: '#f5f5f7',
						},
					],
				};
			},
		};

		console.log();

		const pdfDoc = printer.createPdfKitDocument(docDef);
		pdfDoc.pipe(
			fs.createWriteStream(`./pdf/${result.examId}-${accountId}.pdf`)
		);
		pdfDoc.end();
		successResponse(res, 200, _, req.method);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.postClassToGetExcel = async (req, res, _) => {
	try {
		const vietNamFomatter = new Intl.DateTimeFormat('vi-VN', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		});
		// const { students } = req.body;
		const { classId } = req.params;
		const classroom = await Class.findByPk(classId);
		if (!classroom) {
			throwError(`Classroom not found`, 404);
		}

		const teacher = await Account.findByPk(classroom.accountId);

		const students = await classroom.getAccounts({
			attributes: [
				'id',
				'account_id',
				'lastName',
				'firstName',
				'dob',
				'majorid',
			],
			order: ['firstName', 'id'],
			joinTableAttributes: [],
		});

		const exams = await classroom.getExams({
			attributes: ['id', 'name'],
		});

		const examCols = exams.map((x) => ({
			name: x.toJSON().name,
		}));

		const results = await Promise.all(
			exams.map(async (exam) => {
				const result = await exam.getStudentresults({
					attributes: ['grade', 'accountId', 'examId'],
					order: [['examId', 'DESC']],
				});

				// delete exam.toJSON().id;
				return result;
			})
		);
		results.forEach((x) => x.forEach((x) => console.log(x.toJSON())));
		// console.log(results);

		// Workbook setup
		const workbook = new Excel.Workbook();
		workbook.creator = 'Best Of Test';
		workbook.created = new Date();
		const alphabet = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		];
		const worksheet = workbook.addWorksheet(`Danh sách`, {});
		worksheet.views = [
			{
				// zoomScale: 86,
				showGridLines: false,
			},
		];

		worksheet.mergeCells('B2', 'C2');
		worksheet.properties.defaultColWidth = 20;
		let titleRow = worksheet.getCell('B2');
		titleRow.value = `Lớp ${classroom.name}`;
		titleRow.font = {
			name: 'Calibri',
			size: 18,
			color: { argb: '263895' },
		};
		titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
		titleRow.height = 20;

		const classInfoRow = worksheet.addRow([
			'',
			`Giảng viên: ${teacher.lastName + ' ' + teacher.firstName}`,
			null,
			`Sỉ số: ${students.length}`,
		]);

		worksheet.getCell('B3').border = {
			bottom: {
				style: 'thin',
				color: {
					argb: '808080',
				},
			},
		};

		worksheet.getCell('C3').border = {
			bottom: {
				style: 'thin',
				color: {
					argb: '808080',
				},
			},
		};
		worksheet.getCell('D3').border = {
			bottom: {
				style: 'thin',
				color: {
					argb: '808080',
				},
			},
		};

		classInfoRow.font = {
			size: 9,
			color: {
				argb: '808080',
			},
		};
		worksheet.addRow(
			[
				null,
				`E-mail: ${teacher.email}`,
				null,
				`Ngày tạo file: ngày ${new Intl.DateTimeFormat('vi-VN', {
					dateStyle: 'long',
				}).format(new Date())}`,
			],
			'i+'
		);
		worksheet.mergeCells('B6', 'F6');
		const bheaderRowLeft = worksheet.getCell('B6');
		bheaderRowLeft.value = 'Thông tin thí sinh';
		bheaderRowLeft.font = {
			bold: true,
			size: 10,
			color: {
				argb: 'FFFFFF',
			},
		};
		bheaderRowLeft.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: {
				argb: '263895',
			},
		};
		bheaderRowLeft.alignment = { horizontal: 'center' };

		const examRow = examCols.map((exam) => {
			return Object.values(exam);
		});
		if (exams.length) {
			worksheet.mergeCells('G6', `${alphabet[5 + exams.length]}6`);
			const bheaderRowRight = worksheet.getCell('G6');
			bheaderRowRight.value = 'Bài thi';
			bheaderRowRight.font = {
				bold: true,
				size: 10,
				color: {
					argb: '263895',
				},
			};

			bheaderRowRight.border = {
				bottom: {
					style: 'thin',
					color: {
						argb: '263895',
					},
				},
				left: {
					style: 'thin',
					color: {
						argb: '263895',
					},
				},
				right: {
					style: 'thin',
					color: {
						argb: '263895',
					},
				},
				top: {
					style: 'thin',
					color: {
						argb: '263895',
					},
				},
			};

			// bheaderRowRight.fill = {
			// 	type: 'pattern',
			// 	pattern: 'solid',
			// 	fgColor: {
			// 		argb: '263895',
			// 	},
			// };
			bheaderRowRight.alignment = { horizontal: 'center' };
		}

		const header = worksheet.addRow([
			'',
			'Mã số sinh viên',
			'Họ',
			'Tên',
			'Ngày sinh',
			'Mã ngành',
			...examRow.flat(1),
		]);

		header.alignment = {
			vertical: 'middle',
			horizontal: 'left',
		};

		header.font = {
			bold: true,
			size: 9,
		};

		worksheet.autoFilter = {
			from: 'B7',
			to: `${alphabet[header.values.length - 2]}${students.length - 1 + 8}`,
		};

		console.log(
			`${alphabet[header.values.length - 2]}${students.length - 1 + 8}`
		);
		// worksheet.addRows(students);
		const tens = Array.from(Array(11).fill(0));

		students.forEach((student) => {
			const studentJSON = student.toJSON();
			const studentRefactor = {
				...studentJSON,
				dob: vietNamFomatter.format(new Date(student.dob)),
			};

			const student_arr = Object.values(studentRefactor);
			//convert to array
			const resultCols = results.map((result) => {
				return result
					.find((x) => {
						console.log(x.toJSON());
						return x.toJSON().accountId === student.id;
					})
					?.toJSON();
			});

			const grade_arr = resultCols.map((item) => {
				if (item !== undefined) {
					if (item.grade === null) {
						return 'Chưa làm';
					}
					return item.grade;
				}
			});
			student_arr.shift();

			const studentRow = ['', ...student_arr, ...grade_arr];
			// const row = worksheet.addRow(studentRow);
			const row = worksheet.addRow(studentRow);
			let count = 0;
			row.font = {
				size: 9,
			};
			row.alignment = {
				horizontal: 'left',
			};
			row.eachCell((cell, number) => {
				if (number > 6) {
					if (cell.value !== 'Chưa làm') {
						tens[cell.value]++;
					}

					if (cell.value === 0) {
						//Check grade
						count++;
						cell.font = {
							size: 9,
							bold: true,
							color: {
								argb: 'cc2424',
							},
						};
					}
				}
			});
		});

		worksheet.getColumn('A').width = 2;

		const worksheetStatistics = workbook.addWorksheet(`Số con điểm`);
		console.log(tens);
		tens.forEach((count, number) => {
			worksheetStatistics.addRow([null, `<=${number}`, count]);
		});

		await workbook.xlsx.writeFile(`./class-excel/${classroom.id}.xlsx`);
		successResponse(res, 200, students);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.putClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classFounded = await Classes.findByPk(classId);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 409);
		}

		const { name, password, semester, year, isLock, lectureId } = req.body;
		if (!classFounded) {
			throwError('Class not found', 404);
		}
		await classFounded.update({
			name,
			password: await bcrypt.hash(password, 10),
			semester,
			year,
			isLock,
			lectureId,
		});

		successResponse(res, 201, classFounded, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.putClassStudent = async (req, res, _) => {
	try {
		const { classId, studentId } = req.params;
		const foundedClass = await Classes.findByPk(classId);
		if (!foundedClass) {
			throwError(`Could not find class`, 404);
		}
		const [student] = await foundedClass.getAccounts({
			where: {
				account_id: studentId,
			},
		});
		const { id, name, dob } = req.body;
		if (student) {
			throwError(`Could not find student`, 404);
		}
		await student.update({
			name,
			dob,
		});
		successResponse(res, 200, _, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.patchClassIsLock = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const field = req.query.field || 'isLock';
		const fieldData = req.body[field];

		console.log(fieldData);
		const foundedClass = await Class.findByPk(classId);
		if (!foundedClass) {
			throwError(`Could not find class`, 404);
		}
		await foundedClass.update({
			[field]: fieldData,
		});
		successResponse(res, 200, foundedClass, req.method);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.patchExamIsLock = async (req, res, _) => {
	try {
		const { classId, examId } = req.params;
		const { isLock } = req.body;
		const classroom = await Class.findByPk(classId);
		if (!classroom) {
			throwError('Classroom not found', 404);
		}
		const [exam] = await classroom.getExams({ where: { id: examId } });
		if (!exam) {
			throwError('Exam not found', 404);
		}
		await exam.update({
			isLock,
		});
		successResponse(res, 200, exam, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.deleteClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classFounded = await Classes.findByPk(classId);
		if (!classFounded) {
			throwError('Class not found', 404);
		}
		await classFounded.destroyClass();
		successResponse(res, 200, {}, 'DELETE');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.deleteClassStudent = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const classroom = await Class.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find class`, 404);
		}
		const { studentId } = req.params;
		const [student] = await classroom.getAccounts({
			where: { account_id: studentId },
		});
		if (!student) {
			throwError(`Student not found:`, 404);
		}
		await classroom.removeStudent(student);
		successResponse(res, 200, _, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};
