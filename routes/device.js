const express = require('express');

const validation = require('../middleware/validations')
const authValidation = require('../middleware/auth')
const deviceController = require('../controllers/device');

const router = express.Router();

router.post('/addDevice',[authValidation, validation.addDevice()],deviceController.addDevice);
router.get('/fetchDevices',authValidation,deviceController.fetchDevices);


module.exports = router;