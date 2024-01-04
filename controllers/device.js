const Device = require("../models/device")
const {validationResult} = require('express-validator');

/** create room */
exports.addDevice = async (req, res, next) => {
  
    const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
	  }

    // get data from req.body
    const { name, type, status,uniqueId,attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, attribute7, attribute8 } = req.body;

    // get param from req
    const roomId = req?.query?.roomId

    // check if device name already exists
    const isDeivceExits = await Device.find({name: name})

    // if deivce name exists throw error
    if(isDeivceExits.length > 0){
        return res.status(404).json({message:'Device name already in use !!'});
    }
    
    
    // check if device Primary key already exists
    const isDeivce = await Device.find({uniqueId: uniqueId})
    
    // variable to store device data
    const device = null

    // response message variable
    let msg = null
    
    /**
     * if  
     *      Primary Key exits then update the device
     * else
     *      create new device
     *  */ 

    
    if( isDeivce.length > 0){
        // update the values for device
        device.name = name,
        device.type = type,
        device.roomId = roomId,
        device.user = req.user,
        device.status = status,
        device.uniqueI = uniqueId 
        device.attribute1 = attribute1,
        device.attribute2 = attribute2,
        device.attribute3 = attribute3,
        device.attribute4 = attribute4,
        device.attribute5 = attribute5,
        device.attribute6 = attribute6,
        device.attribute7 = attribute7,
        device.attribute8 = attribute8
        
        msg = "Device updated Successfully !!"

    }else{
        // create new device
        device = new Device({
            name,
            type,
            roomId,
            user: req.user,
            status,
            uniqueId,
            attribute1,
            attribute2,
            attribute3,
            attribute4,
            attribute5,
            attribute6,
            attribute7,
            attribute8
        });

        msg = "Device created !!"
    }


    // save room
    device.save().then(result=>{
        // send response
        res.status(200).json({message: msg,device})
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

exports.fetchDevices = async (req, res) => {

    // getting errors from middleware 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
		const devices = await Device.find().sort({ date: 1 });
		res.json(devices);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
  };