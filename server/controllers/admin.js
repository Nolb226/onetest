const { validationResult } = require('express-validator');
const Account = require('../models/account');
const Class = require('../models/class');
const Exam = require('../models/exam');
const Permission_Group = require('../models/permission_group');

const sequelize = require('../util/database');
const {
	throwError,
	errorResponse,
	successResponse,
} = require('../util/helper');
const Functions = require('../models/function');
// const {
// 	successResponse,
// 	errorResponse,
// 	throwError,
// } = require('../util/helper');

// exports.getAllAccounts = async (req, res, _) => {
// 	try {
// 		const page = req.query.page || 1;
// 		const perPage = 10;
// 		const accounts = await Account.findAll({
// 			limit: perPage,
// 			offset: (page - 1) * perPage,
// 			include: [
// 				{
// 					model: Student,
// 					attributes: ['id', 'fullname'],
// 				},
// 				{ model: Teacher, attributes: ['id', 'fullname'] },
// 			],
// 			attributes: ['id', 'type', 'isActive'],
// 		});
// 		successResponse(res, 200, accounts, req.method);
// 	} catch (error) {
// 		errorResponse(res, error);
// 	}
// };

// exports.getAccount = async (req, res, _) => {
// 	try {
// 		const { accountId } = req.params;
// 		const { type } = req.query;
// 		let account;
// 		if (type === 'SV') {
// 			account = await sequelize.query(
// 				`SELECT 	students.id as id,
// 							students.fullname,students.dob,
// 							departments.name as department_name,
// 							departments.id as department_id,
// 							accounts.createdAt,
// 							majors.name as major_name,
// 							majors.id as major_id,
// 							accounts.type,
// 							accounts.isActive

// 				 FROM 		departments JOIN majors
// 				 ON 		departments.id 		= majors.departmentId
// 				 JOIN		students
// 				 ON 		students.majorId 	= majors.id
// 				 JOIN 		accounts
// 				 ON 		students.accountId	= accounts.id
// 				 WHERE		accounts.id = "${accountId}"`,
// 				{ type: sequelize.QueryTypes.SELECT }
// 			);
// 		}
// 		if (type === 'GV') {
// 			account = await sequelize.query(
// 				`
// 				SELECT 		teachers.id as id,
// 							teachers.fullname,
// 							teachers.dob,
// 							departments.name as department_name,
// 							departments.id as department_id,
// 							accounts.createdAt,
// 							majors.name as major_name,
// 							majors.id as major_id,
// 							accounts.type,
// 							accounts.isActive

// 				FROM 		departments JOIN majors
// 				ON 			departments.id 			= majors.departmentId
// 				JOIN 		teachers
// 				ON 			teachers.departmentId 	= departments.id
// 				JOIN		accounts
// 				ON 			teachers.accountId 		= accounts.id
// 				WHERE 		accounts.id = "${accountId}"`,
// 				{ type: sequelize.QueryTypes.SELECT }
// 			);
// 		}

// 		if (!account[0]) {
// 			throwError(`Could not find account`, 404);
// 		}
// 		successResponse(res, 200, account[0], req.method);
// 	} catch (error) {
// 		errorResponse(res, error);
// 	}
// };

// exports.getAllClasses = async (req, res, _) => {
// 	try {
// 		const page = req.query.page || 1;
// 		const perPage = 10;
// 		const classes = await Class.findAll({
// 			limit: perPage,
// 			offset: (page - 1) * perPage,
// 			include: { all: true },
// 		});
// 		successResponse(res, 200, classes, req.method);
// 	} catch (error) {}
// };
// exports.getAllPermissions = async (req, res, _) => {
// 	try {
// 		const permissions = await Permission_Group.findAll();
// 		successResponse(res, 200, permissions, req.method);
// 	} catch (error) {
// 		errorResponse(res, error);
// 	}
// };

// exports.getAllExams = async (req, res, _) => {
// 	try {
// 		const exams = await Exam.findAll();
// 		successResponse(res, 200, exams, req.method);
// 	} catch (error) {
// 		errorResponse(res, error);
// 	}
// };
exports.getAllAccounts = async (req, res, _) => {
	try {
		const page = req.query.page || 1;
		const perPage = 10;
		const accounts = await sequelize.query(
			`SELECT
			account_id,
			CONCAT(lastName, ' ', firstName) as fullname,
			email,
			accounts.type,
			isActive
			FROM
			accounts
			WHERE account_id != '0'
			LIMIT ${(page - 1) * perPage} ,${perPage};`,
			{ type: sequelize.QueryTypes.SELECT }
		);
		successResponse(res, 200, accounts, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getAccount = async (req, res, _) => {
	try {
		const { accountId } = req.params;
		// const { type } = req.query;
		const account = await sequelize.query(
			`SELECT
			accounts.account_id,
			CONCAT(lastName, ' ', firstName) AS fullname,
			accounts.dob,
			departments.name AS department_name,
			departments.id AS department_id,
			accounts.createdAt,
			majors.name AS major_name,
			majors.id AS major_id,
			accounts.type,
			accounts.isActive
			FROM
			accounts
			JOIN departments ON accounts.departmentId = departments.id
			JOIN majors ON majors.id = accounts.majorId
			WHERE		account_id = "${accountId}"`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		if (!account[0]) {
			throwError(`Could not find account`, 404);
		}
		successResponse(res, 200, account[0], req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getAllPermissions = async (req, res, _) => {
	try {
		// const { type } = req.query;
		const permissions = await sequelize.query(
			`SELECT * FROM permissiongroups WHERE 1`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		Permission_Group.findAll();

		if (!permissions[0]) {
			throwError(`Could not find permissions`, 404);
		}
		successResponse(res, 200, permissions, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.getFuntionOfPermission = async (req, res, _) => {
	try {
		const { permissionId } = req.params;
		const permission = await Permission_Group.findByPk(permissionId);
		if (!permission) {
			throwError(`Could not find permissions`, 404);
		}
		const functions = await permission.getFunctions();
		// console.log(functions.toJSON());

		successResponse(res, 200, functions, req.method);
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.putAcount = async (req, res, _) => {
	try {
		const { accountId } = req.params;
		const accountFounded = await Account.findOne({
			where: {
				account_id: accountId,
			},
		});

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 409);
		}

		const {
			account_id,
			firstName,
			lastName,
			dob,
			departmentId,
			majorId,
			isActive,
			type,
			email,
		} = req.body;
		if (!accountFounded) {
			throwError('Account not found', 404);
		}
		await accountFounded.update({
			account_id,
			firstName,
			lastName,
			dob,
			departmentId,
			majorId,
			isActive,
			type,
			email,
		});

		successResponse(res, 201, accountFounded, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};

exports.postPermission = async (req, res, _) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throwError();
		}
		const { id, name, functions } = req.body;
		const permission = await Permission_Group.create({
			id,
			name,
		});
		const inFunc = await Promise.all(
			functions.map(async (x) => await Functions.findByPk(x.id))
		);
		await permission.addFunctions(inFunc);
		successResponse(res, 201, permission, 'POST');
	} catch (error) {
		errorResponse(res, error, {});
	}
};

exports.putFuntionOfPermission = async (req, res, _) => {
	try {
		const { permissionId } = req.params;
		const permissionFounded = await Permission_Group.findOne({
			where: {
				id: permissionId,
			},
		});
		// console.log(permissionId);
		// console.log(permissionFounded.toJSON());
		if (!permissionFounded) {
			throwError('Permission not found', 404);
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throwError(errors.array(), 409);
		}

		const { functions } = req.body;
		const inFunc = await Promise.all(
			functions.map(async (x) => await Functions.findByPk(x.id))
		);
		await permissionFounded.setFunctions(inFunc);

		successResponse(res, 201, permissionFounded, 'PUT');
	} catch (error) {
		errorResponse(res, error);
	}
};
