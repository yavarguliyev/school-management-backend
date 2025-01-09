const authService = require('../../services/authService');
const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');
const { validateUserSignup, validateUserSignin } = require('../../utils/validate');

jest.mock('../../models/User');
jest.mock('../../utils/generateToken');
jest.mock('../../utils/validate');
jest.mock('../../utils/errorResponse');

describe('Auth Service', () => {
  describe('signup', () => {
    it('should register a user successfully', async () => {
      const userData = { email: 'test@user.com', password: 'password' };
      const newUser = { _id: '1', username: 'testuser', email: 'test@user.com', role: 'user' };
      validateUserSignup.mockReturnValue({ error: null });
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue(newUser);

      const result = await authService.signup(userData);
      expect(result.message).toBe('User registered successfully.');
    });
  });

  describe('signin', () => {
    it('should return a token and user info on successful login', async () => {
      const credentials = { email: 'test@user.com', password: 'password' };
      const user = { _id: '1', username: 'testuser', email: 'test@user.com', role: 'user', matchPassword: jest.fn().mockResolvedValue(true) };
      generateToken.mockReturnValue('mocked-token');
      validateUserSignin.mockReturnValue({ error: null });
      User.findOne.mockResolvedValue(user);

      const result = await authService.signin(credentials);
      expect(result.message).toBe('Login successful.');
      expect(result.token).toBe('mocked-token');
      expect(result.user.username).toBe(user.username);
    });
  });
});