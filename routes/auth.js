const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth");
const passport = require("passport");
router
  .route("/login")
  .post(
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
    })
  )
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
