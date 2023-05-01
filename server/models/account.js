const sequelize = require('../util/database');
const Permission_Group = require('./permission_group');
const DataTypes = require('sequelize').DataTypes;

const Account = sequelize.define('account', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	account_id: {
		type: DataTypes.STRING(10),
		allowNull: false,
	},
	firstName: {
		//Tên
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		//họ
		type: DataTypes.STRING,
		allowNull: false,
	},

	dob: {
		type: DataTypes.DATEONLY,
		allowNull: true,
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	password: { type: DataTypes.STRING, allowNull: false },
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
});

module.exports = Account;
