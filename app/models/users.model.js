const db = require("../config/connect");

const Users = function () {
  this.typeuser = users.typeuser;
  this.username = users.username;
  this.avatar = users.avatar;
  this.phone = users.phone;
  this.email = users.email;
  this.password = users.password;
  this.salt = users.salt;
  this.address = users.address;
  this.lastlogin = users.lastlogin;
  this.createdate = users.createdate;
  this.active = users.active;
};

Users.get_all = function (result) {
  db.query("SELECT * FROM users", function (err, users) {
    if (err) {
      result(null);
    } else {
      result(users);
    }
  });
};

Users.getById = function (id, result) {
  db.query("SELECT * FROM users WHERE id = ?", id, function (err, users) {
    if (err || users.length == 0) {
      result(null);
    } else {
      result(users[0]);
    }
  });
};

Users.create = function (data, result) {
  db.query("INSERT INTO users SET ?", data, function (err, users) {
    if (err) {
      result(null);
    } else {
      result({ id: users.insertId, ...data });
    }
  });
};

Users.remove = function (id, result) {
  db.query("DELETE FROM users WHERE id = ?", id, function (err, users) {
    if (err) {
      result(null);
    } else {
      result("Deleted id " + id + " from users successfully!");
    }
  });
};

Users.update = function (newuser, result) {
  console.log(newuser);
  db.query(
    "UPDATE users SET typeuser = ?, username = ?, avatar = ?, phone = ?, email = ?, password = ?, salt = ?, address  =?, lastlogin = ?, createdate = ?, active = ? WHERE id = ?",
    [
      newuser.typeuser,
      newuser.username,
      newuser.avatar,
      newuser.phone,
      newuser.email,
      newuser.password,
      newuser.salt,
      newuser.address,
      newuser.lastlogin,
      newuser.createdate,
      newuser.active,
    ],
    function (err, users) {
      if (err) {
        result(null);
        console.log("Unseccessfully");
      } else {
        result(newuser);
      }
    }
  );
};

module.exports = Users;
