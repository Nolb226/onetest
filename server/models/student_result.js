const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');
const Student = require('./student');
const Exam = require('./exam');

const Student_Result = sequelize.define('studentResult', {
	studentId: {
		type: DataTypes.STRING(10),
		references: {
			model: Student,
			key: 'id',
		},
	},
	examId: {
		type: DataTypes.STRING(10),
		references: {
			model: Exam,
			key: 'id',
		},
	},
	grade: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Student_Result;
