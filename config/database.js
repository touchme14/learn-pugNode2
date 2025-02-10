//to connect to seq
const Sequelize = require('sequelize');
module.exports = new Sequelize('dbtest', 'postgres', '221B', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
