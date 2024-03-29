const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');
const Student = require('./student');
const Exam = require('./exam');

const Student_Result = sequelize.define('studentresult', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
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
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	// isLock: {
	// 	type: DataTypes.BOOLEAN,
	// 	defaultValue: false,
	// },
	content: {
		type: DataTypes.JSON,
		allowNull: false,
		get: function () {
			return JSON.parse(this.getDataValue('content'));
		},
	},
	isDone: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Student_Result;
