const sequelize = require('../util/database');
const { DataTypes } = require('sequelize');
const Exam = require('./exam');
const Student = require('./student');
const Account = require('./account');

const Class = sequelize.define('class', {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	totalStudent: {
		type: DataTypes.INTEGER(11),
		defaultValue: 0,
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	semester: {
		type: DataTypes.TINYINT(1),

		allowNull: false,
	},
	isLock: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

Class.prototype.createClassExam = async function (examData) {
	const exam = await Exam.create(examData);
	await this.addExam(exam);
	return exam;
};

Class.prototype.createClassStudent = async function (studentData) {
	const account = await Account.create({ password: '', type: 'SV' });
	const student = await account.setStudent(await Student.create(studentData));
	this.totalStudent += 1;
	await this.addStudent(student);
	await this.save();
	return student;
};

Class.prototype.deleteClassStudent = async function (studentId) {
	const student = await Student.findByPk(studentId);
	await this.removeStudent(student);
	this.totalStudent -= 1;
	await this.save();
	return student;
};

module.exports = Class;
