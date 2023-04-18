const Question = require('../models/question');
const sequelize = require('../util/database');
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

exports.putQuestion = async (req, res, _) => {
	try {
		const { questionId } = req.params;
		const question = await Question.findByPk(questionId);
		const { correctAns, answerA, answerB, answerC, answerD, description } =
			req.body;
		await question.update({
			description,
			correctAns,
			answerA,
			answerB,
			answerC,
			answerD,
		});
		successResponse(res, 200, {}, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.deleteQuestion = async (req, res, _) => {
	try {
		const { questionId } = req.params;
		const question = await Question.findByPk(questionId);
		await question.destroy();
		successResponse(res, 200, {}, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.handleQuestion = async (req, res, _) => {
	const { StudentAns } = req.body;

	const response = await Promise.all(
		StudentAns.map(async (question) => {
			const questionInData = await Question.findOne({
				where: { description: question.description },
			});
			return {
				questionInData,
				correct: question.ans === questionInData.correctAns,
			};
		})
	);
	res.status(200).json({ message: 'complete', response });
};
