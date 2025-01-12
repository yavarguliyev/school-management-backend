const ErrorResponse = require('../utils/errorResponse');

const authorize = (roles) => {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }

    next();
  };
};

module.exports = authorize;
