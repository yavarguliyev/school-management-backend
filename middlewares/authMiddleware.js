const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const TokenManager = require('../utils/tokenManager');
const { JWT_SECRET } = process.env;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  if (!TokenManager.hasToken(token)) {
    return next(new ErrorResponse('Invalid or expired token', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

module.exports = authenticate;
