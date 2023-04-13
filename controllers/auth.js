const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const login = async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res
      .status(404)
      .json({ msg: "Please provide username and password" });
  const user = await User.findOne({name});
  if (!user) throw new UnauthenticatedError("User not found");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Password Incorrect");
  else return res.status(StatusCodes.OK).send(`Hello ${user.name}`);
};

//register user
const register = async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password)
    throw new BadRequestError("Name or password field can't be left blank");
  const user = await User.create(req.body);
  res.redirect("/");
};

module.exports = { login, register };
