const sequelize = require('../util/database');
const Account = require('./account');
const DataTypes = require('sequelize').DataTypes;
const dayjs = require('dayjs');

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
		get: function () {
			return dayjs(this.getDataValue('dob')).format('D-M-YYYY');
		},
	},
	accountId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: { model: 'accounts', key: 'id' },
	},
});

Teacher.createAccount = async function (teacherData) {
	const { id, fullname, dob, foreignKey } = teacherData;
	const account = await Account.create({
		password: teacherData.password || '',
		type: 'GV',
	});
	const teacher = await Teacher.create({
		id,
		fullname,
		dob,
		departmentId: foreignKey,
	});
	await teacher.setAccount(account);
	const result = await Teacher.fineOne({ id, include: Account });

	return result;
};

module.exports = Teacher;
