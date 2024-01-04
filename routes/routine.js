const express = require('express');

const validation = require('../middleware/validations')
const authValidation = require('../middleware/auth')
const routineController = require('../controllers/routine');

const router = express.Router();

router.post('/createRoutine',[authValidation, validation.createRoutine()],routineController.createRoutine);

router.get('/fetchRoutines',authValidation,routineController.fetchRoutines);


module.exports = router;