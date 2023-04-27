'use strict';
const { validationResult } = require('express-validator');
// const Excel = require('exceljs');
const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
const Classes = require('../models/class');
const classDetails = require('../models/classdetail');
const Chapter = require('../models/chapter');

//helper
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

const Teacher = require('../models/teacher');
const Lecture = require('../models/lecture');
const Student_Result = require('../models/student_result');
const Exam = require('../models/exam');
const Class = require('../models/class');
const e = require('express');
const sequelize = require('../util/database');
const { Op, QueryTypes } = require('sequelize');
const Student = require('../models/student');
const Question = require('../models/question');
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
			console.log(req.query.search);
			const classrooms = await req.user.getClasses({
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
			if (req.account.type === 'GV') {
				const total = await sequelize.query(
					`
			
				SELECT 	COUNT(classes.id) as id
			
				FROM	classes
				JOIN	lectures
				ON		lectures.id = classes.lectureId
				JOIN	teachers
				ON		teachers.id = classes.teacherId
				WHERE	(classes.id LIKE "${search}%"
				OR		classes.name LIKE "${search} %")
				AND		teachers.id = "${req.user.id}"
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
			if (req.account.type === 'SV') {
				const total = await sequelize.query(
					`
			
				SELECT 	COUNT(classes.id) as id
			
				FROM	classes
				JOIN	classdetail
				ON		classdetail.classId = classes.id
				WHERE	(classes.id LIKE "${search}%"
				OR		classes.name LIKE "${search} %")
				AND		studentId = "${req.user.id}"
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
		}
		const page = req.query.page || 1;
		const pageSize = 10;

		const { user, account } = req;
		if (!account.isActive) {
			return successResponse(res, 200, {}, 'GET');
		}

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
		if (account.type === 'SV') {
			total = await classDetails.count({ where: { studentId: user.id } });
			return successResponse(res, 200, { data: classes, total });
		}

		if (account.type === 'GV') {
			total = await Class.count({ where: { teacherId: user.id } });
			return successResponse(res, 200, { data: classes, total });
		}
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.getClass = async (req, res, _) => {
	try {
		const { classId } = req.params;
		const foundedClass = await Classes.findByPk(classId, {
			include: [
				{ model: Teacher, attributes: ['id', 'fullname'] },
				{ model: Lecture, attributes: ['id', 'name', 'credits'] },
			],
			attributes: ['year', 'id', 'name', 'semester'],
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
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const messages = errors
				.array()
				.map((err) => err.msg)
				.join(',');
			throwError(messages, 400);
		}
		const { classId } = req.params;

		const classroom = await Classes.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find class`, 404);
		}
		const students = await classroom.getStudents({
			attributes: ['id', 'fullname'],
			include: [
				{
					model: Student_Result,
					attributes: ['grade'],
				},
			],
			order: ['fullname', 'id'],

			joinTableAttributes: [],
			// raw: true,
			// nest: true,
			offset: (page - 1) * perPage,
			limit: perPage,
		});
		const total = await classDetails.count({ where: { classId } });
		const total_exam = await Exam.count({ where: { classId } });
		const exam_name = await classroom.getExams({
			attributes: ['examId', 'name'],
		});
		const data = {
			exam_name,
			class_name: classroom.name,
			data: students,
			total,
			total_exam,
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

		const studentsInClass = await classroom.getStudents({
			where: { id: studentId },
			joinTableAttributes: [],
		});
		if (!studentsInClass[0]) {
			throwError(`Couldn't find student`, 404);
		}
		successResponse(res, 200, studentsInClass[0]);

		// successResponse(res, 200, { id, fullname, dob, majorId });
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getClassesExams = async (req, res, _) => {
	const { user } = req;

	try {
		// const exams = await user.getClasses({
		// 	include: [{ model: Exam }, { model: Lecture, attributes: ['name'] }],
		// 	attributes: ['name'],
		// 	joinTableAttributes: [],
		// 	// raw: true,
		// 	nest: true,
		// });
		const page = req.query.page || 1;
		const perPage = 10;
		const exams = await sequelize.query(
			`
			SELECT   	classes.id as class_id,
						lectures.name as lecture_name,
						exams.name,
						exams.id,
						exams.isLock

			FROM      	classes 
			JOIN		exams 
			ON 			classes.id = exams.classId 
			JOIN      	lectures 
			ON 			classes.lectureId = lectures.id 
			WHERE 		classes.teacherId = "${req.user.id}" 
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
		const { user } = req;
		const { sort } = req.query;
		const exams = await sequelize.query(
			`
				SELECT	exams.id,duration,exams.examId as exam_id,exams.name as exam_name,lectures.name as lecture_name,isDone,totalQuestions,exams.isLock
				FROM	lectures
				JOIN	classes
				ON 		classes.lectureId 			= lectures.id
				JOIN	exams
				ON		classes.id 					= exams.classId
				JOIN	studentresults
				ON		exams.id 					= studentresults.examId
				JOIN	students
				ON		students.id 				= studentresults.studentId
				WHERE	classes.id 					= "${classId}"
				AND		students.id 				= "${user.id}"
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
		// const studentresults = await sequelize.query(
		// 	`
		// 	SELECT * FROM classes JOIN classdetail ON classes.id = classdetail.classId JOIN students ON students.id = classdetail.studentId JOIN studentresults ON studentresults.studentId = students.id JOIN exams ON exams.id = studentresults.examId WHERE classes.id ="${classId}" GROUP BY students.id
		// `,
		// 	{ type: sequelize.QueryTypes.SELECT }
		// );
		// const results = await Promise.all(
		// 	studentresults.map(async (result) => {
		// 		const exams = await Student_Result.findAll({
		// 			where: { studentId: result.studentId },
		// 		});
		// 		console.log(exams);
		// 		return { ...result, exams };
		// 	})
		// );

		const classroom = await Class.findByPk(classId);
		if (!classroom) {
			throwError(`Could not find class`, 404);
		}
		const studentresults = await classroom.getStudents({
			include: [
				{
					model: Exam,
					attributes: ['id', 'name'],
					through: {
						attributes: ['grade', 'content'],
					},
				},
			],
			attributes: ['dob', 'id', 'fullname'],
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
		// const foundedClass = await Classes.findByPk(classId);
		// if (!foundedClass) {
		// 	throwError(`Could not find class`, 404);
		// }
		// const exams = await foundedClass.getExams({
		// 	where: { id: examId },
		// 	attributes: [
		// 		'id',
		// 		'name',
		// 		'timeStart',
		// 		'timeEnd',
		// 		'duration',
		// 		'totalQuestions',
		// 		// 'ratioQuestions',
		// 		'easy',
		// 		'hard',
		// 		'type',
		// 		'isLock',
		// 	],
		// 	include: [
		// 		{
		// 			model: Student,
		// 			attributes: ['id', 'fullname'],
		// 			through: { attributes: ['grade'] },
		// 		},
		// 	],
		// });
		// if (!exams[0]) {
		// 	throwError('Could not find exam', 404);
		// }
		const { sort } = req.query;

		const [result] = await sequelize.query(
			`
				SELECT	lectures.name as lecture_name,
						students.fullname as student_name,
						exams.name as exam_name,
						exams.examId as exam_id,
						duration,
						totalQuestions,
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
				JOIN	students
				ON		studentresults.studentId 	= students.id
				WHERE	classes.id 					= "${classId}"
				AND		exams.id					= "${examId}"
				AND		students.id 				= "${req.user.id}"

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
		const { classId, examId } = req.params;
		const foundedClass = await Classes.findByPk(classId);
		if (!foundedClass) {
			throwError(`Could not find class`, 404);
		}
		const exam = await foundedClass.getExams({ where: { id: examId } });
		if (!exam) {
			throwError(`Could not find exam`, 404);
		}
		const studentresults = await exam[0].getStudents({
			attributes: ['id', 'fullname'],
			through: { attributes: ['grade'] },
		});

		// const studentresults = await sequelize.query(
		// 	`
		// 	SELECT * FROM classes JOIN classdetail ON classes.id = classdetail.classId JOIN students ON students.id = classdetail.studentId JOIN studentresults ON studentresults.studentId = students.id JOIN exams ON exams.id = studentresults.examId WHERE exams.id ="${examId}" AND classes.id ="${classId}" GROUP BY exams.id
		// `,
		// 	{ type: sequelize.QueryTypes.SELECT }
		// );
		successResponse(res, 200, studentresults);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getStudentResultInClass = async (req, res, _) => {
	try {
		const { classId, examId } = req.params;
		// const classroom = await Class.findByPk(classId);
		// const exams = await classroom.getExams(examId);
		// const result = await exams[0].getStudents({
		// 	where: {
		// 		id: req.user.id,
		// 	},
		// 	include: [
		// 		{
		// 			model: Student_Result,
		// 		},
		// 	],
		// });
		// const [content] = result[0].studentresults;

		const [result] = await sequelize.query(
			`
			SELECT  timeStart, timeEnd, content, duration,isDone
			FROM	classes
			JOIN	exams
			ON		exams.classId 	= classes.id
			JOIN	studentresults 
			ON		exams.id 		= studentresults.examId
			JOIN	students
			ON		students.id 	= studentresults.studentId
			WHERE	exams.id 		= "${examId}"
			AND		classes.id		= "${classId}"
			AND		students.id		= "${req.user.id}"
		`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		const { content: newContent } = result;
		result.content = JSON.parse(newContent);
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
					level

			FROM	classes

			JOIN	lectures
			ON		lectures.id 			= classes.lectureId
			JOIN	chapters
			ON		lectures.id 			= chapters.lectureId
			JOIN	questions
			ON		chapters.id 			= questions.chapterId
			WHERE	chapters.id 			= "${classroom.lectureId}-${query}"
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
		const { user } = req;
		const { id, name, password, year, semester, lectureId, accountpassword } =
			req.body;
		const newClass = await Class.create({
			name,
			password,
			semester,
			year,
			lectureId,
		});

		await user.addClass(newClass);

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
					await newClass.createClassStudent({
						accountpassword,
						id: student['MSSV'] || student['Mã sinh viên'],
						dob: new Date(year, month, day),
						fullname:
							student['Họ tên'] || student['Họ lót'] + ' ' + student['Tên'],
						majorId: student['chuyên ngành'] || student['Mã lớp'].slice(0, 3),
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
		const errors = validationResult(req.body);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 409);
		}
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
		const [student, created] = await Student.findOrCreate({
			where: {
				id: 0,
			},
			defaults: {
				id: 0,
				fullname: '',
				dob: new Date(),
			},
		});
		const students = await classroom.getStudents();
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
						console.log('sd');
						return await student.addExam(exam, {
							through: { content: newQuestions },
						});
					})
				);
				await student.addExam(exam, {
					through: { content: newQuestions },
				});

				successResponse(res, 200, result);
			} catch (error) {
				console.log(error);
				throwError(error);
			}
		}

		if (type === '1') {
			const query = chapters
				?.split(',')
				.join(`" OR chapters.id = "${classroom.lectureId}-`);
			try {
				const examContent = await Promise.all(
					questions.map(async (question) => {
						const chapter = await Chapter.findByPk(question.id);
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
		const isValid = password === foundedClass.password;
		if (!isValid || foundedClass.isLock) {
			throwError(`Could not join class`, 409);
		}
		await foundedClass.addStudent(req.user);

		const newTotal = await classDetails.count({
			where: { classId: foundedClass.id },
		});
		foundedClass.totalStudent = newTotal;
		await foundedClass.save();
		const exams = foundedClass.getExams();
		await Promise.all(
			exams.map(async (exam) => {
				if (exams.type != 3) {
					const studentDumb = await Student.findByPk(0);
					return await req.user.addExam(exam, {
						through: {
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
					return await req.user.addExam(exam, {
						through: {
							content: content,
						},
					});
				}
			})
		);

		successResponse(res, 201, req.user, req.method);
	} catch (error) {
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
			where: { studentId: req.user.id, examId },
		});
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
						grade += 1;
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
		const [student] = await foundedClass.getStudents({
			where: {
				id: studentId,
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
		const [student] = await classroom.getStudents({
			where: { id: studentId },
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
