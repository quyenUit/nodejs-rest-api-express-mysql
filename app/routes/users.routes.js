module.exports = function (router) {
  var userController = require("../controllers/users.controller");

  router.get("/users/list", userController.get_list);

  router.get("/users/detail/:id", userController.detail);

  router.post("/users/add", userController.add_users);

  router.delete("/users/delete/:id", userController.remove_users);

  router.put("/users/update", userController.update_users);

  router.delete("/delete", userController.deleteAll);
};
