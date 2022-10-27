const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");
const _AuthMiddleWares = require("./app/config/_AuthMiddleWares");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors({ origin: true }));

//
require("./app/routes/home.routes")(app);
//
require("./app/routes/account.routes")(app);
//
app.use(_AuthMiddleWares.isAth);
//
require("./app/routes/users.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}`);
});
