const { Sequelize } = require('sequelize');

const connection = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = connection;