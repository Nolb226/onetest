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
			console.log(this.getDataValue('content'));
			typeof this.getDataValue('content') === 'object' &&
				this.setDataValue(
					'content',
					JSON.stringify(this.getDataValue('content'))
				);
			return JSON.parse(this.getDataValue('content'));
		},
	},
	isDone: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

Student_Result.beforeUpdate = async (instance) => {
	try {
		const { content } = instance;
		instance.content = JSON.stringify(content);
		await instance.save();
	} catch (error) {}
};

module.exports = Student_Result;
