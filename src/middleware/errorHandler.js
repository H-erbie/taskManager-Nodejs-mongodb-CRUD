const { constants } = require("../constants");


const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        tile: "VALIDATION FALIED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case constants.UNAUTHORIZED:
      res.json({
        tile: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break
      case constants.FORBIDDEN:
      res.json({
        tile: "fORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break
    case constants.NOT_FOUND:
      res.json({
        tile: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      default:
      break
  }
  
};
module.exports = errorHandler;
