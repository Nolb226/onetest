const Account = require('../models/account');
const Exam = require('../models/exam');
const Functions = require('../models/function');
const Permission_Group = require('../models/permission_group');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const sequelize = require('../util/database');
const { errorResponse, successResponse } = require('../util/helper');

module.exports.test = async (req, res) => {
	try {
		const result = await sequelize.query(
			`
		SELECT * FROM (
			(
				SELECT
					questions.id,
					description,
					correctAns,
					answerA,
					answerB,
					answerC,
					answerD,
					questions.level
				FROM
					lectures
				JOIN chapters ON lectures.id = chapters.lectureId
				JOIN questions ON chapters.id = questions.chapterId
				WHERE
					chapters.id = "841109-1" AND questions.level = 0
				LIMIT 10
			)
				UNION ALL 
				(
					SELECT
						questions.id,
						description,
						correctAns,
						answerA,
						answerB,
						answerC,
						answerD,
						questions.level
					FROM
						lectures
					JOIN chapters ON lectures.id = chapters.lectureId
					JOIN questions ON chapters.id = questions.chapterId
					WHERE
						chapters.id = "841109-1" AND questions.level = 1
					LIMIT 10
				)
		) as q 
		ORDER BY RAND()
		
		`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		successResponse(res, 200, result);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.get = async (req, res, _) => {
	try {
		const exam = await Exam.findByPk(4);
		const chapters = await exam.getChapters();
		a = chapters.map((chapter) => chapter.id).join('" OR Chapters.id ="');
		console.log(a);
		successResponse(res, 200, chapters);
	} catch (error) {
		errorResponse(res, error);
	}
};
