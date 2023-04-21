const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const Exam = sequelize.define('exam', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	},
	examId: {
		type: DataTypes.INTEGER(3),
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	timeStart: {
		type: DataTypes.DATE,
	},
	timeEnd: {
		type: DataTypes.DATE,
	},
	duration: {
		type: DataTypes.INTEGER,
	},
	totalQuestions: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	easy: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	hard: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	isLock: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Exam;
