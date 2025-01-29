const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/login', loginUser)

router.post('/auth/signup', signupUser)

module.exports = router;