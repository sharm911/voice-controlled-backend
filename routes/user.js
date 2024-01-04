const express = require('express');

const validation = require('../middleware/validations')
const userController = require('../controllers/user');

const router = express.Router();

router.post('/register',validation.registerUser(),userController.createUser);
router.post('/login',validation.loginUser(),userController.loginUser);


module.exports = router;