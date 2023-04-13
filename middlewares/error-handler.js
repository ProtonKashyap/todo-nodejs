const { StatusCodes } = require("http-status-codes");

const errorHanderMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.stausCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong,please try again later",
  };
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
module.exports = errorHanderMiddleware;
