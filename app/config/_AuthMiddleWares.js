const { request } = require("express");

let isAuth = async function (req, res, next) {
  var _JWT = require("../config/_JWT");
  var _token = req.headers.authorization;
  if (_token) {
    try {
      var authData = await _JWT.check(_token);
      request.auth = authData;
      next();
    } catch (err) {
      return res.send({ data: "Ma token khong hop le" });
    }
  } else {
    return res.send({ data: "Ban chua gui kem ma token" });
  }
};

module.exports = {
  isAth: isAuth,
};
