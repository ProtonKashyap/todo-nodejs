const express = require("express");
const router = express.Router();
const  register  = require("../controllers/auth");
const passport = require("passport");

const { checkLoggedIn } = require("../util/utilityFunctions");

//get requests
router.route("/login").get(checkLoggedIn, function (req, res, next) {
  return res.render("login");
});
router.route("/register").get(function (req, res, next) {
  return res.render("register");
});

//post requests
router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);
router.route("/register").post(register);

module.exports = router;
