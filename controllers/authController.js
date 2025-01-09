const { signup, signin, logout } = require('../services/authService');

const authSignup = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await signup(userData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const authSignin = async (req, res, next) => {
  try {
    const credentials = req.body;
    const result = await signin(credentials);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const authLogout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is required for logout.' });
    }

    const result = await logout(token);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authSignup,
  authSignin,
  authLogout,
};