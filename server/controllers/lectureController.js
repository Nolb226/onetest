const Chapter = require('../models/chapter');
const Class = require('../models/class');
const Exam = require('../models/exam');
const Lecture = require('../models/lecture');
const Question = require('../models/question');
// const Student = require('../models/student');
const Student_Result = require('../models/student_result');
const sequelize = require('../util/database');
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

exports.getLectures = async (req, res, _) => {
	try {
		const lectures = await Lecture.findAll();
		successResponse(res, 200, lectures, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getLecture = async (req, res, _) => {
	try {
		const { lectureId } = req.params;
		const lecture = await Lecture.findByPk(lectureId, {
			include: { all: true },
		});
		if (!lecture) {
			throwError(`Couldn't find lecture`, 404);
		}
		successResponse(res, 200, lecture, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getLecturesUser = async (req, res, _) => {
	try {
		const { account } = req;
		const lectures = await account.getLectures({
			joinTableAttributes: [],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
		successResponse(res, 200, lectures);
	} catch (error) {
		console.log(error);
		errorResponse(res, error);
	}
};

exports.getLectureChapters = async (req, res, _) => {
	try {
		const { lectureId } = req.params;
		const lecture = await Lecture.findByPk(lectureId);
		if (!lecture) {
			throwError(`Couldn't find lecture`, 404);
		}
		const chapters = await lecture.getChapters({
			attributes: ['id', 'name', 'numberOfQuestions'],
		});
		successResponse(res, 200, chapters, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getLectureStudentResults = async (req, res) => {
	try {
		const { lectureId } = req.params;
		const lecture = await Lecture.findByPk(lectureId);
		if (!lecture) {
			throwError('Could not find lecture', 404);
		}
		const grade = [
			'grade_0',
			'grade_1',
			'grade_2',
			'grade_3',
			'grade_4',
			'grade_5',
			'grade_6',
			'grade_7',
			'grade_8',
			'grade_9',
			'grade_10',
		];
		const query = grade
			.map((col, index) => {
				return `
			(SELECT 	COUNT(grade)
				FROM 		classes
				JOIN		exams
				ON			exams.classId = classes.id
				JOIN 		studentresults
				ON 			studentresults.examId	= exams.id
				WHERE 		classes.lectureId 			="${lectureId}"
				AND			grade IS NOT NULL
				AND			grade = "${index}")

			 as ${col}
			`;
			})
			.join(',');
		console.log(query);
		console.log(1);

		const [result] = await sequelize.query(
			`
				SELECT
							${query}

			`,
			{ type: sequelize.QueryTypes.SELECT }
		);
		successResponse(res, 200, result, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.postLectureQuestion = async (req, res, _) => {
	try {
		const { lectureId, chapterId } = req.params;
		const lecture = await Lecture.findByPk(lectureId);
		const { questions } = req.body;
		const [chapter, created] = await Chapter.findOrCreate({
			where: {
				id: `${lectureId}-${chapterId}`,
			},
			defaults: {
				lectureId: lecture.id,
				name: `Chương ${chapterId} ${lecture.name}`,
				numberOfQuestions: 0,
			},
		});
		await Promise.all(
			JSON.parse(questions).map(async (question) => {
				try {
					const created = await chapter.createQuestion(question);

					return created;
				} catch (error) {
					throwError(`${error}`, 400);
				}
			})
		);

		const total = await Question.count({
			where: { chapterId: chapter.id },
		});
		await chapter.update({
			numberOfQuestions: total,
		});

		successResponse(res, 200, _, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.putLectureQuestions = async (req, res, _) => {
	try {
		const { lectureId, chapterId } = req.params;
		const lecture = await Lecture.findByPk(lectureId);
		const questions = req.body;
		console.log(questions);
		await Promise.all(
			questions.map(async (question) => {
				try {
					const created = await Question.findByPk(question.id);
					await created.update({
						description: question.description,
						answerA: question.answerA,
						answerB: question.answerB,
						answerC: question.answerC,
						answerD: question.answerD,
						correctAns: question.correctAns,
						status: 1,
					});

					return created;
				} catch (error) {
					throwError(`${error}`, 400);
				}
			})
		);

		successResponse(res, 200, _, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getLectureQuestion = async (req, res, _) => {
	try {
		const { lectureId, chapterId } = req.params;
		const chapter = await Chapter.findByPk(`${lectureId}-${chapterId}`);
		const questions = await chapter.getQuestions();
		successResponse(res, 200, questions, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.deleteLectureQuestion = async (req, res, _) => {
	try {
		const questions = req.body;
		await Promise.all(
			questions.map(async (question) => {
				const questionInDB = await Question.findByPk(question.id);
				await questionInDB.destroy();
			})
		);
		successResponse(res, 200, _, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};
