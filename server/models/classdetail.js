const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Class = require('./class');
const Student = require('./student');

const classDetails = sequelize.define(
	'classdetail',
	{
		studentId: {
			type: DataTypes.STRING(10),
			references: {
				model: Student,
				key: 'id',
			},
		},
		classId: {
			type: DataTypes.STRING(10),
			references: {
				model: Class,
				key: 'id',
			},
		},
	},

	{ freezeTableName: true, timestamps: false }
);

module.exports = classDetails;
