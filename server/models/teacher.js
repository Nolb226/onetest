const sequelize = require('../util/database');
const DataTypes = require('sequelize').DataTypes;

const Teacher = sequelize.define('teacher', {
	id: {
		type: DataTypes.STRING(10),
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	fullname: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	dob: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	accountId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: { model: 'accounts', key: 'id' },
	},
});

module.exports = Teacher;
