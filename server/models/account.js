const sequelize = require('../util/database');
const DataTypes = require('sequelize').DataTypes;

const Account = sequelize.define('account', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	password: { type: DataTypes.STRING(20), allowNull: false },
	type: {
		type: DataTypes.STRING(10),
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Account;