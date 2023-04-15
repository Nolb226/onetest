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
				SELECT  questions.id,
						description,
						correctAns,
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
				WHERE	chapters.id 			= "WEBC1"
				AND		questions.difficulty 	= "Dễ"
				LIMIT	10 
			)
				UNION ALL 
			(
				SELECT  questions.id,
						description,
						correctAns,
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
				WHERE	chapters.id 			= "WEBC1"
				AND		questions.difficulty 	= "Khó"
				LIMIT	10 
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
