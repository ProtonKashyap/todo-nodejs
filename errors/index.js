const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const CustomAPIError = require("./custom-api");

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  CustomAPIError,
};
