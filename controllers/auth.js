const User = require("../models/User");
const {  BadRequestError } = require("../errors");

//register user
const register = async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password)
    throw new BadRequestError("Name or password field can't be left blank");
  await User.create(req.body);
  res.redirect("/");
};

module.exports =  register ;
