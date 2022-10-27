module.exports = function (router) {
  var userController = require("../controllers/users.controller");
  var JWT = require("../config/_JWT");
  router.get("/", userController.get_list);

  router.get("/about", userController.get_list);

  router.get("/token", async function (req, res) {
    var user = {
      name: "Admin",
      email: "admin@gmail.com",
    };
    const _token = await JWT.make(user);
    res.send({ token: _token });
  });

  router.get("/check_token", async function (req, res) {
    try {
      var _token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2NjcxNDAxOCwiZXhwIjoxNjY2NzE3NjE4fQ.lQcESmfid0E0yYOs7qRRPaASAW83mbK_2HNqy4UkYqQ";
      const data = await JWT.check(_token);
      res.send({ data: data });
    } catch (err) {
      res.send({ data: "Ma token khong hop le" });
    }
  });
};
