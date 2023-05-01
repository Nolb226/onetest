const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Class = require('./class');
const Account = require('./account');

const classDetails = sequelize.define(
	'classdetail',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		accountId: {
			type: DataTypes.INTEGER,
			references: {
				model: Account,
				key: 'id',
			},
			allowNull: false,
		},
		classId: {
			type: DataTypes.STRING,
			references: {
				model: Class,
				key: 'id',
			},
			allowNull: false,
		},
	},

	{ freezeTableName: true, timestamps: false }
);

module.exports = classDetails;
