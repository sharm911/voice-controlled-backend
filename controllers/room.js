const Room = require("../models/room")
const {validationResult} = require('express-validator');

/** create room */
exports.createRoom = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors)
	  if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
	  }

    // get data from req.body
    const { name, type, roomOwner } = req.body;

    // check if room already exists
    const isRoomExits = await Room.find({name: name})

    // if room name exists throw error
    if(isRoomExits.length > 0){
        return res.status(404).json({message:'Room name already in use !!'});
    }
    
    // create new rooom
    const room = new Room({
        name: name,
        type: type,
        roomOwner:roomOwner,
        user: req.user
    });
    
    // save room
    room.save().then(result=>{
        // send response
        res.status(200).json({message:'Room created',room})
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

exports.fetchRoom = async (req, res) => {

    // getting errors from middleware 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
		const rooms = await Room.find().sort({ date: 1 });
		res.json(rooms);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
  };