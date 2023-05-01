const sequelize = require('../util/database');
const Permission_Group = require('./permission_group');
const DataTypes = require('sequelize').DataTypes;

const Account = sequelize.define('account', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	password: { type: DataTypes.STRING, allowNull: false },
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
});

module.exports = Account;
