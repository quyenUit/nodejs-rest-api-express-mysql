var Users = require("../models/users.model");
var JWT = require("../config/_JWT");
exports.get_list = function (req, res) {
  Users.get_all(function (data) {
    res.send({ result: data });
  });
};

//
exports.detail = function (req, res) {
  Users.getById(req.params.id, function (respnse) {
    res.send({ result: respnse });
  });
};

//
exports.add_users = function (req, res) {
  var data = req.body;
  Users.create(data, function (respnse) {
    res.send({ result: respnse });
  });
};

//
exports.remove_users = function (req, res) {
  var id = req.params.id;
  Users.remove(id, function (respnse) {
    res.send({ result: respnse });
  });
};

//
exports.update_users = function (req, res) {
  var data = req.body;
  Users.update(data, function (respnse) {
    res.send({ result: respnse });
  });
};

//
exports.deleteAll = function (req, res) {
  Users.removeAll(function (ree, data) {
    if (err) {
      res.redirect("/500");
    } else {
      res.redirect("/users?delete=true");
    }
  });
};

//
exports.login = function (req, res) {
  var data = req.body;
  Users.check_login(data, async function (respnse) {
    if (respnse) {
      const _token = await JWT.make(respnse);
      res.send({ result: _token, status: true });
    } else {
      res.send({ result: "", status: false });
    }
  });
};

//
// exports.handleLogin = async (req, res) => {
//   let email = req.email;
//   let password = req.body.password;
//   if (!email || password) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Missing inputs parameter!",
//     });
//   }

//   let userData = await userService.handleUserLogin(email, password);
//   return res.status(200).json({
//     errCode: userData.errCode,
//     message: userData.errMessage,
//     user: userData.user ? userData.user : {},
//   });
// };
