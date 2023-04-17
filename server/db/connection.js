const mysql      = require("mysql");
const connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  port : "3306",
  password : '',
  database : "library"
});
 
connection.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("connected to mysql");
});
 
module.exports = connection;