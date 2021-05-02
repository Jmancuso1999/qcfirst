const mysql = require("mysql2/promise");

class backend {

    constructor() {
        this.connection = null;
    }

    async connect() {
        this.connection = await mysql.createConnection({
          host: "localhost",
          port: 3406,
          user: "root",
          password: "", //Have to find a way to encrypt the password 
          database: "qcfirst",
        });
        return this.connection;
      }

    async disconnect() {
        return this.connection.end();
    }
    
}