const Account = require('../models/account');
const bycrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const accountIsExist = await Account.findOne({ username });
		if (!accountIsExist) {
			const error = new Error('Account already exists');
		}

		const account = await Account.create({
			id: '3121560033',
			password: await bycrypt.hash('123', 10),
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
