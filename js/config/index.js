const pkg = require("../../package.json");

module.exports = {
    applicationName: pkg.name,
    mysql: {
        options: {
          host: "localhost",
          port: 3406,
          database: "qcfirst",
          dialect: "mysql",
          username: "root",
          password: "password",
        },
        client: null,
      },
};