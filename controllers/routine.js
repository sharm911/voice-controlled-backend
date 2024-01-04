const Routine = require("../models/routine")
const {validationResult} = require('express-validator');

/** create room */
exports.createRoutine = async (req, res, next) => {
  
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

    // get data from req.body
    const { name, time, schedule, isEnabled, deviceId, actionId} = req.body;

    // check if routine name already exists
    const isRoutineExists = await Routine.find({name: name})

    // if routine name exists throw error
    if(isRoutineExists.length > 0){
        return res.status(404).json({message:'Routine name already in use !!'});
    }
    
    // create new routine
    const routine = new Routine({
        name,
        time: convertTo12HourFormat(time),
        schedule,
        isEnabled,
        deviceId,
        actionId,
        user: req.user,
        });


    // save routine
    routine.save().then(result=>{
        // send response
        res.status(200).json({message: 'Routine create successfully !!',routine})
    })
    .catch(error=>{

        // error handling
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    })
};


/** fetch room */

exports.fetchRoutines = async (req, res) => {

    // getting errors from middleware 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
        const rotuines = await Routine.find().sort({ date: 1 });
        res.json(rotuines);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
  };

// function to conver time to 12hr format
function convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(':');
    const dateObj = new Date(0, 0, 0, hours, minutes);
    const formattedTime = dateObj.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  
    return formattedTime;
  }