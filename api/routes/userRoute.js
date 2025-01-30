const express = require('express');
const { signinUser, signupUser } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/signin', signinUser);

router.post('/auth/signup', signupUser)

module.exports = router;