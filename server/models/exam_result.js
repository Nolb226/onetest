const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const Exam_Result = sequelize.define('examResult', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	studentId: {
		type: DataTypes.STRING(10),
		allowNull: true,
		reference: {
			model: 'students',
			key: 'id',
		},
	},
	examId: {
		type: DataTypes.STRING(10),
		allowNull: true,
		reference: {
			model: 'exams',
			key: 'id',
		},
	},
});

module.exports = Exam_Result;
