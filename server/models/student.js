const sequelize = require('../util/database');
const Account = require('./account');
const DataTypes = require('sequelize').DataTypes;

const Student = sequelize.define('student', {
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
		references: { model: Account, key: 'id' },
	},
});

Student.prototype.createStudentAccount = async function (studentData) {
	const account = await Account.create({ password: '', type: 'SV' });
	await this.setAccount(account);
	return account;
};

module.exports = Student;
