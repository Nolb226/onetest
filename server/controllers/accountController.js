const { successResponse, errorResponse } = require('../util/helper');

exports.getUserAccount = async (req, res, _) => {
	try {
		console.log(req.user);
		successResponse(res, 200, req.user);
	} catch (error) {
		errorResponse(res, error);
	}
};
