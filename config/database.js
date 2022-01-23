const Sequelize = require('sequelize');
const db = new Sequelize('codegig', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = db;