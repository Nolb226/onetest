const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const Functions = require('../models/function');
const Permission_Group = require('../models/permission_group');
const { throwError, errorResponse } = require('../util/helper');
const socket = require('../util/socket');
module.exports.isAuth = async (req, res, next) => {
	try {
		const token = req.get('Authorization')?.split(' ')[1];
		if (!token) {
			throwError('Invalid authorization', 401);
		}
		const decodedToken = jwt.verify(token, 'group5');
		const { id: accountId } = decodedToken;
		const user = await Account.findByPk(accountId);
		if (!user) {
			throwError('Invalid account id in token', 401);
		}

		const permissions = await user.getPermissiongroup({
			include: [
				{
					model: Functions,
					attributes: ['id', 'method', 'path', 'descripton'],
					through: {
						attributes: [],
					},
				},
			],
		});

		// req.user = JSON.stringify(user);
		req.account = user;
		req.permissions = JSON.stringify(permissions.toJSON().functions);
		next();
	} catch (error) {
		if (
			error instanceof jwt.JsonWebTokenError ||
			error instanceof jwt.JsonWebTokenError
		) {
			console.log('|||||||||| ERROR');
			// socket.getIO().emit('jwt:expired', 123);
		}
		errorResponse(res, error);
	}
};
