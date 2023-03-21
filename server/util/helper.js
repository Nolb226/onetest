exports.errorResponse = function (res, error, data = {}) {
	return res.status(error.statusCode || 500).json({
		status: error.statusCode || 500,
		message: error.message,
		data,
	});
};

exports.successResponse = function (res, status, data) {
	let message = 'Fetch successfully';
	if (status === 201) message = 'Created successfully';

	return res.status(status).json({
		status,
		message,
		data,
	});
};

exports.throwError = function (message, status) {
	const error = new Error(message);
	error.statusCode = status;
	throw error;
};
