const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth");
router
  .route("/login")
  .post(login)
  .get((req, res, next) => {
    return res.render("login");
  });
router
  .route("/register")
  .post(register)
  .get((req, res, next) => {
    return res.render("register");
  });
module.exports = router;