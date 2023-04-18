const Account = require('../models/account');
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

		// const test = await sequelize.query(
		// 	`
		// SELECT * FROM(
		// 	(
		// 		SELECT 	fullname,student,
		// 		FROM	classes
		// 		JOIN	exams
		// 		ON		classes.id = exams.classId
		// 		JOIN	classdetail
		// 		ON		classes.id = classdetail.classId
		// 		JOIN  	students
		// 		ON 		classdetail.studentId = students.id
		// 	)
		// 	UNION
		// 	(
		// 		SELECT	*
		// 	)

		// ) as q

		// `,
		// 	{
		// 		type: sequelize.QueryTypes.SELECT,
		// 	}
		// );

		successResponse(res, 200, result);
	} catch (error) {
		errorResponse(res, error);
	}
};
