const generateToken = require('../utils/generateToken');
const { validateUserSignup, validateUserSignin } = require('../utils/validate');
const User = require('../models/User');

// #region In-memory storage for active tokens (for simplicity)
const activeTokens = new Set();
// #endregion

const signup = async (userData) => {
  const { error } = validateUserSignup(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User with this email already exists.');
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
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await user.matchPassword(password)
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  const token = generateToken(user._id);
  activeTokens.add(token);

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
  if (activeTokens.has(token)) {
    activeTokens.delete(token);

    return { message: 'Logout successful.' };
  } else {
    throw new Error('Invalid token or user already logged out.');
  }
};

module.exports = {
  signup,
  signin,
  logout,
};
