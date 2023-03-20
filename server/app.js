//Packages
const express = require('express');
const bodyParser = require('body-parser');

//Utils
const sequelize = require('./util/database');
const app = express();

//Models

(() => {
	const Department = require('./models/department');
	const Major = require('./models/major');
	const Lecture = require('./models/lecture');
	const Class = require('./models/class');
	const Chapter = require('./models/chapter');
	const Question = require('./models/question');
	const Exam = require('./models/exam');

	const Student = require('./models/student');
	const Account = require('./models/account');

	const Teacher = require('./models/teacher');
	const Notification = require('./models/notification');

	const Student_Result = require('./models/student_result');
	const Exam_Result = require('./models/exam_result');

	const Permission_Group = require('./models/permission_group');
	const Function = require('./models/function');

	//Models relationship

	Department.hasMany(Major);
	Major.belongsTo(Department);

	Major.belongsToMany(Lecture, { through: 'lectureDetail' });
	Lecture.belongsToMany(Major, { through: 'lectureDetail' });

	Lecture.hasMany(Chapter);
	Chapter.belongsTo(Lecture);

	Chapter.hasMany(Question);
	Question.belongsTo(Chapter);

	Student.belongsTo(Account, { foreignKey: 'accountId' });
	Account.hasOne(Student, { foreignKey: 'accountId' });

	Teacher.belongsTo(Account, { foreignKey: 'accountId' });
	Account.hasOne(Teacher, { foreignKey: 'accountId' });

	Student.belongsTo(Major);
	Major.hasMany(Student);

	Major.belongsTo(Teacher, { foreignKey: 'headOfMajor' });
	Teacher.hasOne(Major, { foreignKey: 'headOfMajor' });

	Student.belongsToMany(Class, {
		through: 'classDetail',
		timestamps: false,
		foreignKey: 'studentId',
	});
	Class.belongsToMany(Student, {
		through: 'classDetail',
		timestamps: false,
		foreignKey: 'classId',
	});

	Student.belongsToMany(Exam, {
		through: Student_Result,
		timestamps: false,
		foreignKey: 'studentId',
	});
	Exam.belongsToMany(Student, {
		through: Student_Result,
		timestamps: false,
		foreignKey: 'examId',
	});

	Exam.hasMany(Student_Result);
	Student_Result.belongsTo(Exam);

	Student.hasMany(Student_Result);
	Student_Result.belongsTo(Exam);

	Teacher.belongsTo(Department);
	Department.hasMany(Teacher);

	Department.belongsTo(Teacher, { foreignKey: 'headOfDepartment' });
	Teacher.hasOne(Department, { foreignKey: 'headOfDepartment' });

	Teacher.hasOne(Lecture, { foreignKey: 'headOfLecture' });
	Lecture.belongsTo(Teacher, { foreignKey: 'headOfLecture' });

	Teacher.belongsToMany(Lecture, { through: 'teach', timestamps: false });
	Lecture.belongsToMany(Teacher, { through: 'teach', timestamps: false });

	Teacher.hasMany(Class);
	Class.belongsTo(Teacher);

	Lecture.hasMany(Class);
	Class.belongsTo(Lecture);

	Class.hasMany(Exam);
	Exam.belongsTo(Class);

	Exam.belongsToMany(Question, { through: Exam_Result });
	Question.belongsToMany(Exam, { through: Exam_Result });

	Class.hasMany(Notification);
	Notification.belongsTo(Class);

	Account.belongsToMany(Permission_Group, {
		through: 'groupdetail',
		timestamps: false,
	});
	Permission_Group.belongsToMany(Account, {
		through: 'groupdetail',
		timestamps: false,
	});

	Permission_Group.belongsToMany(Function, {
		through: 'functionDetail',
		timestamps: false,
	});
	Function.belongsToMany(Permission_Group, {
		through: 'functionDetail',
		timestamps: false,
	});
})();

//Routes define
const authRoutes = require('./routes/auth');
const questionsRoutes = require('./routes/question');
//Middleware

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	next();
});

//Routes seperate paths

app.use('/auth', authRoutes);
app.use('/questions', questionsRoutes);

//App start when connected to database
sequelize
	// .sync({ force: true })
	.sync()

	.then(() => {
		console.log('Connected');
		app.listen(8080);
	})
	.catch((err) => console.log('Fail to connect to the database' + err));
