const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const Permission_Group = sequelize.define('permissiongroup', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Permission_Group;
