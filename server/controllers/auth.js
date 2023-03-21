const Account = require('../models/account');
const bycrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.signup = async (req, res, next) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const messages = errors
				.array()
				.map((err) => err.msg)
				.join(',');
			const error = new Error(messages);
			error.statusCode = 400;
			throw error;
		}

		const { username, password, type, fullname, dob } = req.body;

		const upperCaseType = type.toUpperCase();

		const model = upperCaseType === 'GV' ? Teacher : Student;

		const foreignKey =
			upperCaseType === 'GV' ? req.body.departmentId : req.body.majorId;

		const accountIsExist = await model.findOne({
			where: { id: username },
		});
		if (accountIsExist) {
			return res.status(422).json({ message: 'Account already exists' });
		}

		const account = await model.createAccount({
			id: username,
			fullname,
			dob,
			password: await bycrypt.hash(password, 10),
			upperCaseType,
			foreignKey,
		});
		res.status(201).json({ message: 'Account created successfully', account });
	} catch (error) {
		res.status(error.statusCode || 500).json({ error: error.message });
		console.log(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const student = await Student.findOne({ id: username, include: Account });
		const teacher = await Teacher.findOne({ id: username, include: Account });
		const { account } = student || teacher;
		if (!account) {
			const error = new Error('Username or password was wrong');
			error.statusCode = 401;
			throw error;
		}
		const isValid = bycrypt.compare(password, account.password);
		if (!isValid) {
			const error = new Error('Username or password was wrong');
			error.statusCode = 401;
			throw error;
		}
		res.status(200).json(student || teacher);
	} catch (error) {
		console.log(error);
		res.status(error.statusCode || 500).json({ error: error.message });
	}
};
