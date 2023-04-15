const { successResponse, errorResponse } = require('../util/helper');

exports.getUserAccount = async (req, res, _) => {
	try {
		successResponse(res, 200, req.user);
	} catch (error) {
		errorResponse(res, error);
	}
};
