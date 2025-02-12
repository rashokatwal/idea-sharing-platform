const express = require('express');
const { signinUser, signupUser, updateUserDetails, getUserDetails } = require('../controllers/userController');

const router = express.Router();

router.post('/auth/signin', signinUser);

router.post('/auth/signup', signupUser);

router.patch('/auth/updateUserDetails/:id', updateUserDetails);

router.get('/user/:username', getUserDetails);

module.exports = router;