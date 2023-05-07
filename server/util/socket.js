let io;
const jwt = require('jsonwebtoken');
// import { port } from '../../test/src/config/port';

const Account = require('../models/account');
// const { default: port } = require('../../test/src/config/port');
const Exam = require('../models/exam');
const Student_Result = require('../models/student_result');
const Classes = require('../models/class');
const { throwError } = require('./helper');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const sequelize = require('./database');
const { QueryTypes } = require('sequelize');
module.exports = {
	init: (httpSever) => {
		io = new Server(httpSever, {
			cors: {
				origin: [
					// `${port}:3000`,
					// 'https://admin.socket.io',
					'http://192.168.1.3:3000',
					'http://localhost:3000',
					'http://127.0.0.1:3000',
				],
				allowedHeaders: ['Authorization', 'Content-Type'],
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
				transports: ['websocket', 'polling'],
				allowEIO3: true,
				// pingTimeout: 60000,
			},
			// maxHttpBufferSize: 1e8,
		});
		// instrument(io, {
		// 	auth: false,
		// 	mode: 'development',
		// });
		// io.listen(httpSever);
		io.use(async (socket, next) => {
			try {
				// Get the token from the handshake query parameters
				const token = socket.handshake.auth.token;
				// console.log(token);
				// Verify and decode the JWT token
				const decoded = jwt.verify(token, 'group5'); // Replace 'your-secret-key' with your actual secret key

				// Retrieve the user and associated classes
				const user = await Account.findByPk(decoded.id);
				const classes = await sequelize.query(
					`
					SELECT	classes.id
					FROM	classes
					JOIN 	classdetail ON classes.id 						= classdetail.classId
					JOIN 	accounts 										AS student
					ON		classdetail.accountId 							= student.id
					WHERE	student.id			 							= "${user.id}"
					`,
					{
						type: QueryTypes.SELECT,
					}
				);
				// const classrooms = await user.getClasses();

				// Extract the class IDs from the user's classes
				const classIds = classes.map((c) => c.id);

				// Attach the user and class information to the socket object for later use
				socket.user = user;
				socket.classIds = classIds;

				// Continue with the socket connection
				next();
			} catch (error) {
				console.error('Error authenticating user:', error);
				next(new Error('Authentication failed'));
			}
		});

		io.on('connection', (socket) => {
			const user = socket.user;
			const classIds = socket.classIds;

			// Join the socket to the rooms based on the class IDs
			classIds.forEach((classId) => {
				// console.log(user.toJSON());
				console.log(classId);
				socket.join(classId.toString());
			});
			socket.on('exam:start', async (response) => {
				console.log(socket.request.account);
				console.log(response);
				const test = await Student_Result.findByPk(response.id);
				const exam = await Exam.findByPk(test.examId);
				const timeEnd = new Date(exam.timeEnd);
				const { duration } = test;
				// const
				let timer;
				let click = test.clickedOutside;
				const currentTime = new Date();
				const countDownDuration = () => {
					const timeLeft = timeEnd - currentTime;
					console.log(timeLeft);

					const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
					const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
					const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
					const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');

					socket.emit('test', { hours, seconds, minutes });
					if (time === 0) {
						socket.emit('exam:expired');
						clearInterval(timer);
						return;
					}
					if (timeLeft <= 0) {
						socket.emit('exam:expired');
						clearInterval(timer);
						return;
					}
					// duration--;
					time--;
					console.log(time);
				};
				// let time = duration * 60;
				let time = duration;
				// countDownDuration();
				timer = setInterval(countDownDuration, 1000);
				socket.on('exam:clickOutside', () => {
					click += 1;
				});

				// startTimer(test.duration);

				const handleTest = async () => {
					console.log('||||||||||||||||||||||||||||||||');
					await test.update({
						duration: time,
						clickedOutside: click,
					});
				};

				socket.on('exam:leave', async () => {
					await handleTest();
					clearInterval(timer);
				});
			});

			socket.on('class:exam-lock', (classId, examId, lockState) => {
				console.log('||||||||||||||||||||||||||||||||||');
				console.log(classId, examId, lockState);
				socket.to(`${classId}`).emit('exam:lock', examId, lockState);
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
