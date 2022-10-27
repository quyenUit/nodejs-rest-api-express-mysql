var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "db4free.net",
  user: "svuit2023",
  password: "svuit@2023",
  database: "sharefood",
});

connection.connect(function (err) {
  if (err) {
    console.log("Connection database is unsuccessfully!");
  }
});

module.exports = connection;
