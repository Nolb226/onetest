let io;

// const { default: port } = require('../../test/src/config/port');
const Exam = require('../models/exam');
const Student_Result = require('../models/student_result');
const { throwError } = require('./helper');
module.exports = {
	init: (httpSever) => {
		io = require('socket.io')(httpSever, {
			cors: {
				origin: [
					// `${port}:3000`,
					'http://172.20.10.5:3000',
					'http://localhost:3000',
				],
				allowedHeaders: ['Authorization', 'Content-Type'],
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
			},
		});
		io.on('connection', (socket) => {
			console.log(socket.handshake.auth.token);
			socket.on('exam:start', async (response, cb) => {
				console.log(response);
				const test = await Student_Result.findByPk(response.id);
				const exam = await Exam.findByPk(test.examId);
				const timeEnd = new Date(response.timeEnd).getTime();

				const { duration } = test;
				let timer;
				let click = 0;
				const currentTime = new Date().getTime();
				const countDownDuration = () => {
					const timeLeft = timeEnd - currentTime;

					const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
					const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
					const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
					const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');

					socket.emit('test', { hours, seconds, minutes });
					if (time === 0 || timeLeft === 0) {
						socket.emit('exam:end');
						clearInterval(timer);
						return;
					}
					// duration--;
					time--;
				};
				// let time = duration * 60;
				let time = duration;
				// countDownDuration();
				timer = setInterval(countDownDuration, 1000);
				socket.on('exam:click', () => {
					click += 1;
				});

				// startTimer(test.duration);

				const handleTest = async () => {
					console.log('||||||||||||||||||||||||||||||||');
					clearInterval(timer);
					await test.update({
						duration: time,
					});
				};

				socket.on('exam:leave', async () => {
					handleTest();
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
