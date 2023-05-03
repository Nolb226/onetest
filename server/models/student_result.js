const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');
const Exam = require('./exam');
const Account = require('./account');

const Student_Result = sequelize.define('studentresult', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	accountId: {
		type: DataTypes.INTEGER,
		references: {
			model: Account,
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

	clickedOutside: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},

	isDone: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},

	duration: {
		type: DataTypes.TIME,
		allowNull: false,
		set: function (value) {
			console.log(value);
			const hours = String(parseInt(value / 3600, 10)).padStart(2, '0');
			const others = String(parseInt(value % 3600, 10)).padStart(2, '0');
			const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
			const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');
			const duration = `${hours}:${minutes}:${seconds}`;
			this.setDataValue('duration', duration);
		},
		get: function () {
			const timeArr = this.getDataValue('duration').split(':');
			console.log(timeArr);
			const seconds = parseInt(timeArr[2], 10);
			const minutes = parseInt(timeArr[1], 10);
			const hours = parseInt(timeArr[0], 10);
			return hours * 3600 + minutes * 60 + seconds;
		},
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
