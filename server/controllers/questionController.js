const { restart } = require('nodemon');
const { literal } = require('sequelize');
const Question = require('../models/question');
const {
	successResponse,
	errorResponse,
	throwError,
} = require('../util/helper');

exports.getQuestions = async function (req, res, _) {
	try {
		const order = req.query.order ? literal(req.query.order) : [['id', 'ASC']];
		const limit = req.query.limit;
		const questions = await Question.findAndCountAll({ order, limit });
		const { rows: result, count: total } = questions;
		successResponse(res, 200, { questions: result, total });
	} catch (error) {
		errorResponse(res, error, [{}]);
	}
};

exports.getQuestion = async function (req, res, _) {
	try {
		const { questionId } = req.params;
		const question = await Question.findByPk(questionId);
		if (!question) {
			throwError('Question not found', 404);
		}
		successResponse(res, 200, question);
	} catch (error) {
		errorResponse(res, error, {});
	}
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
