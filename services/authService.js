const generateToken = require('../utils/generateToken');
const ErrorResponse = require('../utils/errorResponse');
const TokenManager = require('../utils/tokenManager');
const { validateUserSignup, validateUserSignin } = require('../utils/validate');
const User = require('../models/User');

const signup = async (userData) => {
  const { error } = validateUserSignup(userData);
  if (error) {
    throw new ErrorResponse(error.details[0].message, 400);
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ErrorResponse('User with this email already exists.', 400);
  }

  const newUser = new User(userData);
  await newUser.save();

  return {
    message: 'User registered successfully.',
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

const signin = async (credentials) => {
  const { error } = validateUserSignin(credentials);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { email, password } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  const isPasswordValid = await user.matchPassword(password)
  if (!isPasswordValid) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  const token = generateToken(user);
  TokenManager.addToken(token);

  return {
    message: 'Login successful.',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

const logout = async (token) => {
  if (TokenManager.hasToken(token)) {
    TokenManager.removeToken(token);
    return { message: 'Logout successful.' };
  } else {
    throw new ErrorResponse('Invalid token or user already logged out.', 400);
  }
};

module.exports = {
  signup,
  signin,
  logout,
};
