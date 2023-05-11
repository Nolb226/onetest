const { successResponse, errorResponse } = require('../util/helper');

exports.getUserPermissions = async (req, res, _) => {
	try {
		successResponse(res, 200, JSON.parse(req.permissions));
	} catch (error) {
		errorResponse(res, error);
	}
};
