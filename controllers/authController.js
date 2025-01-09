const { signup, signin } = require('../services/authService');

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

const authLogout = async (_req, res, _next) => {
  res.status(200).json({ message: 'Logout successful.' });
};

module.exports = {
  authSignup,
  authSignin,
  authLogout,
};
