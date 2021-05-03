const http = require("http");
const Sequelize = require("sequelize");

const config = require("../config");

function connectToMySQL() {
  const sequelize = new Sequelize(config.mysql.options);
  sequelize
    .authenticate()
    .then(() => {
      console.info("Successfully connected to MySQL");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
  return sequelize;
}

const mysql = connectToMySQL();
config.mysql.client = mysql;
