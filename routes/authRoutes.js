const express = require('express');
const { authSignup, authSignin, authLogout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authSignup);
router.post('/signin', authSignin);
router.post('/logout', authLogout);

module.exports = router;
