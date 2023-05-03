let io;

const { throwError } = require('./helper');
module.exports = {
	init: (httpSever) => {
		io = require('socket.io')(httpSever, {
			cors: {
				origin: '*',
				allowedHeaders: ['Authorization', 'Content-Type'],
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
			},
		});
	},
	getIO: () => {
		if (!io) {
			throwError(`Cant get IO `, 500);
		}
		return io;
	},
};
