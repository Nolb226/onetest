const Class = require('../models/class');
const Exam = require('../models/exam');
const Lecture = require('../models/lecture');
const Student = require('../models/student');
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
