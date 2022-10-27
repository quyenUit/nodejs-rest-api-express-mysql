module.exports = function (router) {
  var userController = require("../controllers/users.controller");
  // var loginController = require("../controllers/auth/login.controller");
  // var registerController = require("../controllers/auth/register.controller");

  router.get("/users/list", userController.get_list);

  router.get("/users/detail/:id", userController.detail);

  router.post("/users/add", userController.add_users);

  router.delete("/users/delete/:id", userController.remove_users);

  router.put("/users/update", userController.update_users);

  router.delete("/users/delete", userController.deleteAll);

  // router.post("/users/login", loginController.login);

  // router.post("/api/register", registerController.handleRegister);
};
