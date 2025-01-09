const express = require('express');
const { authSignup, authSignin, authLogout } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user by providing user data.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/signup', authSignup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User login
 *     description: Logs in an existing user and returns an authentication token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/signin', authSignin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out the user
 *     description: Logs out the currently authenticated user by invalidating their token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The authentication token of the logged-in user
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       400:
 *         description: Token is required
 *       500:
 *         description: Internal server error
 */
router.post('/logout', authLogout);

module.exports = router;
