const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');

const Functions = sequelize.define('Function', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	descripton: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
module.exports = Functions;
