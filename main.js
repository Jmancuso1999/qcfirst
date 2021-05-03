const backend = require("./js/backend");

async function runMySQL() {
    const mySQLBackend = new backend();
    return mySQLBackend.max();
  }
  
runMySQL()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
