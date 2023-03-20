const Account = require('../models/account');
const bycrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw res.status(400).json({ message: errors, errors: errors.array() });
		}
		const { username, password, type, fullname } = req.body;
		const accountIsExist = await Account.findOne({
			id: username,
			include: Account,
		});
		if (!accountIsExist) {
			const error = new Error('Account already exists');
			error.statusCode = 422;
			throw error;
		}

		const account = await Account.build({
			id: username,
			password: await bycrypt.hash('password', 10),
			type: 'sv',
		});
		console.log(account);
		res.status(200).json(account);
	} catch (error) {
		console.log(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const account = await Account.findOne({ username });
		if (!account) {
			const error = new Error('Username not found');
			throw error;
		}
		const isValid = bycrypt.compare(password, account.password);
	} catch (err) {
		console.log(err);
	}
};
