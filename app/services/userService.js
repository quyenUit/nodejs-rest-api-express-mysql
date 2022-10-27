import bcrypt from "bcryptjs";
import Users from "../models/users.model";

var db = require("../models/users.model");
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist

        let user = await db.Users.findOne({
          where: { email: email },
          attributes: {
            include: ["email", "roleId", "password"],
            where: { email: email },
            raw: false,
          },
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }

        // resolve();
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `your's Email isn't exist in your system. Pleasetry other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
};
