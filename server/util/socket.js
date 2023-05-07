let io;
const jwt = require("jsonwebtoken");
// import { port } from '../../test/src/config/port';

const Account = require("../models/account");
// const { default: port } = require('../../test/src/config/port');
const Exam = require("../models/exam");
const Student_Result = require("../models/student_result");
const Classes = require("../models/class");
const { throwError } = require("./helper");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const sequelize = require("./database");
const { QueryTypes } = require("sequelize");
module.exports = {
   init: (httpSever) => {
      io = require("socket.io")(httpSever, {
         cors: {
            origin: [
               // `${port}:3000`,
               // 'https://admin.socket.io',
               "http://192.168.1.3:3000",
               "http://localhost:3000",
               "http://127.0.0.1:3000",
            ],
            allowedHeaders: ["Authorization", "Content-Type"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
         },
      });
      io.on("connection", (socket) => {
         console.log(socket.handshake.auth.token);
         socket.on("exam:start", async (response, cb) => {
            console.log(response);
            const test = await Student_Result.findByPk(response.id);
            const exam = await Exam.findByPk(test.examId);
            const timeEnd = new Date(response.timeEnd).getTime();

            const { duration } = test;
            let timer;
            let click = 0;
            const countDownDuration = () => {
               const currentTime = new Date().getTime();
               // const test = timeEnd - currentTime;
               const test = currentTime - currentTime;

               socket.emit("test", { hours, seconds, minutes });
               if (time === 0) {
                  socket.emit("exam:expired");
                  clearInterval(timer);
                  return;
               }
               if (timeLeft <= 0) {
                  socket.emit("exam:expired");
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
            socket.on("exam:clickOutside", () => {
               click += 1;
            });

            // startTimer(test.duration);

            const handleTest = async () => {
               console.log("||||||||||||||||||||||||||||||||");
               await test.update({
                  duration: time,
                  clickedOutside: click,
               });
            };

            socket.on("exam:leave", async () => {
               await handleTest();
               clearInterval(timer);
            });
         });

         socket.on("class:exam-lock", (classId, examId, lockState) => {
            console.log("||||||||||||||||||||||||||||||||||");
            console.log(classId, examId, lockState);
            socket.to(`${classId}`).emit("exam:lock", examId, lockState);
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
