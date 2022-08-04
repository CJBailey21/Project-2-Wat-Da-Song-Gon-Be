const { Sequelize } = require('sequelize');

const connection = new Sequelize('Users','root','4321',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = connection;