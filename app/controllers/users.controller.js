var Users = require("../models/users.model");

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
