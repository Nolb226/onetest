const { Op } = require('sequelize');
const sequelize = require('../util/database');
const Lecture = require('./lecture');
const Question = require('./question');
const DataTypes = require('sequelize').DataTypes;

const Chapter = sequelize.define('chapter', {
	id: {
		type: DataTypes.STRING,
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
		defaultValue: 0,
	},
});

Chapter.addHook('beforeValidate', async function (chapter) {
	const { lectureId } = chapter;
	const lecture = await Lecture.findByPk(lectureId);

	const [result] = await sequelize.query(
		`
		SELECT 		COUNT(chapters.id) as number
		FROM		chapters
		WHERE		chapters.lectureId = "${lectureId}"
		AND	NOT		chapters.id = "${lectureId}-0"
	`,
		{
			type: sequelize.QueryTypes.SELECT,
		}
	);
	console.log(result);
	chapter.id = `${lectureId}-${result.number + 1}`;
});

module.exports = Chapter;
