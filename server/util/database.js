const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
const node_env = process.env.NODE_ENV;
console.log(node_env);

if (node_env === 'production') {
	sequelize = new Sequelize(process.env.DB_NAME || 'qlttn', 'root', '', {
		host: 'localhost',
		dialect: 'mysql',
		port: '3306',
	});
} else if (node_env === 'test ') {
	sequelize = new Sequelize('hoang', 'root', '', {
		host: 'localhost',
		dialect: 'mysql',
		port: '3306',
		timezone: '+07:00',
	});
} else {
	throw new Error(`Invalid NODE_ENV value: ${node_env}`);
}

// const sequelize = new Sequelize(
// 	process.env.DB_NAME || 'bestoftest',
// 	process.env.DB_USERNAME || 'qlttngroup5',
// 	process.env.DB_PASSWORD || 'bestoftestgroup5',
// 	{
// 		host: process.env.DB_HOST || 'db4free.net',

// 		dialect: 'mysql',
// 		port: process.env.DB_PORT || '3306',
// 	}
// );
module.exports = sequelize;
