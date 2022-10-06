var express = require("express");
var app = express();
const cors = require("cors");

var bodyParser = require("body-parser");

// const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(cors());
// app.get("/", (req, res, next) => {
//   res.render("index");
// });

//
require("./app/routes/users.routes")(app);

//Node.js Login System mit Express, JWT & MySQL (Rest API)
// const router = require("./app/routes/router");
// app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}`);
});
