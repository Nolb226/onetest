const { QueryTypes } = require('sequelize');
const Functions = require('../models/function');
const sequelize = require('../util/database');
const { successResponse, errorResponse } = require('../util/helper');
const Account = require('../models/account');
const bycrypt = require('bcryptjs');
const Permission_Group = require('../models/permission_group');

exports.getUserAccount = async (req, res, _) => {
	try {
		const user = await Account.findByPk(req.account.id, {
			attributes: [
				[
					sequelize.fn(
						'CONCAT',
						sequelize.col('lastName'),
						' ',
						sequelize.col('firstName')
					),
					'fullname',
					
				],
				'account_id',
				'dob'
			],
			include: [
				{
					model: Permission_Group,
				},
			],
		});
		successResponse(res, 200, user);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getCurrentPermission = async (req, res, _) => {
	try {
		const permissions = await sequelize.query(
			`
		
		SELECT	method,
				path
		FROM	permissiongroups
		JOIN	accounts
		ON		accounts.type = permissiongroups.id
		JOIN	functiondetail
		ON		functiondetail.permissiongroupId = permissiongroups.id
		JOIN	functions
		ON		functions.id = functiondetail.functionId
		WHERE	accounts.id = "${req.account.id}"
		
		`,
			{
				type: QueryTypes.SELECT,
			}
		);
		successResponse(res, 200, permissions);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getNotify = async (req, res, _) => {
	try {
		const notify = await sequelize.query(
			`
			SELECT *
			FROM	noftifications
			JOIN	
			`
		);
	} catch (error) {
		errorResponse(res, 200);
	}
};

exports.getAccount = async (req, res, _) => {
	try {
		const { accountId } = req.params;
		const accountFounded = await Account.findOne({
			where: {
				id: accountId,
			},
		});

		successResponse(res, 200, accountFounded, 'GET');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.putAccount = async (req, res, _) => {
	try {
		const { accountId } = req.params;
		const accountFounded = await Account.findOne({
			where: {
				account_id: accountId,
			},
		});
		// console.log(accountFounded);
		// console.log(req.body);
		const { account_id, dob, fullName } = req.body;
		if (!accountFounded) {
			throwError('Account not found', 404);
		}
		// console.log(fullName);
		let lastName = '';
		for (let index = 0; index < fullName.split(' ').length - 1; index++) {
			if (index == fullName.split(' ').length - 2) {
				lastName += fullName.split(' ')[index];
			} else {
				lastName += fullName.split(' ')[index] + ' ';
			}
		}
		await accountFounded.update({
			account_id,
			firstName: fullName.split(' ').at(-1),
			lastName,
			dob,
		});

		successResponse(res, 200, _, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.patchPass = async (req, res, _) => {
	try {
		const { accountId } = req.params;
		const accountFounded = await Account.findOne({
			where: {
				account_id: accountId,
			},
		});
		// console.log(accountFounded);
		const { oldPass, password } = req.body;
		const isValid = bycrypt.compareSync(oldPass, accountFounded.password);
		if (!accountFounded) {
			throwError('Account not found', 404);
		}
		if (!isValid) {
			throwError('Username or password is incorrect', 401);
		}
		// console.log(fullName);
		await accountFounded.update({
			password: await bycrypt.hash(password, 10),
		});

		successResponse(res, 200, _, 'PATCH');
	} catch (error) {
		errorResponse(res, error);
	}
};
