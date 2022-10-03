const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../config/connect");
const userMiddleware = require("../middlewares/users");

router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username = ?) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This username is alrealy in use!",
        });
      } else {
        //username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            //has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, username, password, createdate) VALUES ("${uuid.v4()}", ${db.escape(
                res.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      //user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          //wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );
          }

          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

router.get("/secret-route", userMiddleware.isLoggedln, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = router;
