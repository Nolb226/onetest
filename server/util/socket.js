let io;

const Exam = require('../models/exam');
const Student_Result = require('../models/student_result');
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
		io.on('connection', (socket) => {
			console.log(socket.handshake.auth.token);
			socket.on('exam:start', (response) => {
				// const test = await Student_Result.findByPk(response.id);
				// const exam = await Exam.findByPk(test.examId);
				// const timeEnd = new Date(response.timeEnd).getTime();

				// const { duration } = test;
				// let timer;
				// let click = 0;
				// const countDownDuration = () => {
				// 	const currentTime = new Date().getTime();
				// 	// const test = timeEnd - currentTime;
				// 	const test = currentTime - currentTime;

				// 	const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
				// 	const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
				// 	const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
				// 	const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');
				// 	socket.emit('test', { hours, seconds, minutes });
				// 	if (time === 0) {
				// 		clearInterval(timer);
				// 		return;
				// 	}
				// 	// duration--;
				// 	time--;
				// 	console.log(time);
				// };
				// // let time = duration * 60;
				// let time = duration;
				// console.log(duration);
				// countDownDuration();
				// timer = setInterval(countDownDuration, 1000);
				// socket.on('exam:click', () => {
				// 	click += 1;
				// });

				// startTimer(exam.duration)

				socket.on('exam:end', (response) => {
					console.log('||||||||||||||||||||||||||||||||||||');
					console.log(response);
					// const { hours, minutes, seconds } = duration;
					// const time = hours * 3600 + minutes * 60 + seconds;
					socket.emit('exam:clear');
					// socket.emit('exam:clear');
					// await test.update({
					// 	duration: time,
					// 	// 	// clickedOutside: test.clickedOutside + click,
					// });
					// console.log(socket.id);
					// clearInterval(timer);
				});
			});
		});
	},
	getIO: () => {
		if (!io) {
			throwError(`Cant get IO `, 500);
		}
		return io;
	},
};
