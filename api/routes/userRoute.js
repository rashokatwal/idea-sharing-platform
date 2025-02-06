const express = require('express');
const { signinUser, signupUser, updateUserDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/signin', signinUser);

router.post('/auth/signup', signupUser);

router.patch('/auth/updateUserDetails/:id', updateUserDetails);

module.exports = router;