const express = require('express');

const validation = require('../middleware/validations')
const authValidation = require('../middleware/auth')
const roomController = require('../controllers/room');

const router = express.Router();

router.post('/createRoom',[authValidation, validation.CreateRoom()],roomController.createRoom);
router.get('/fetchRooms',authValidation,roomController.fetchRoom);


module.exports = router;