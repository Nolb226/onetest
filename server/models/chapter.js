const sequelize = require('../util/database');
const DataTypes = require('sequelize').DataTypes;

const Chapter = sequelize.define('chapter', {
	id: {
		type: DataTypes.STRING(10),
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	numberOfQuestions: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
	},
});

module.exports = Chapter;
