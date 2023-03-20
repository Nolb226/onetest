const { restart } = require('nodemon');
const Question = require('../models/question');

exports.getQuestions = async function (_, res, _) {
	const questions = await Question.findAll();
	res.status(200).json(questions);
};

exports.getQuestion = async function (req, res, _) {
	const { questionId } = req.params;
	const question = await Question.findByPk(questionId);
	res.status(200).json(question);
};

exports.updateQuestion = async (req, res, _) => {
	const { questionId } = req.params;

	const question = await Question.findByPk(questionId);
};

exports.deleteQuestion = async (req, res, _) => {};

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
