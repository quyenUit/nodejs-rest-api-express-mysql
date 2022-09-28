var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//
require("./app/routes/users.routes")(app);

//const PORT = process.env.PORT || 3000;
app.listen(3000, function () {
  console.log("Server listening on http://localhost:3000");
});