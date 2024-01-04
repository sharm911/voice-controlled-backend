const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user")
const {validationResult} = require('express-validator');

/** Register User */
exports.createUser = async (req, res, next) => {
  
    const errors = validationResult(req);
    console.log(errors)
	  if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
	  }

   
    const { fullName, email, password } = req.body;

    const isUserExits = await User.find({email: email})

    if(isUserExits.length > 0){
        return res.status(404).json({message:'User with this email already exists'});
    }
    
   //hashing the password before saving
   
    bcrypt.hash(password,12)
    .then(hashedPassword=>{

        // creating user object
        const user = new User({
            fullName: fullName,
            email: email,
            password:hashedPassword,
        });

        // saving  user
        return user.save();
    })
    .then(result=>{

        // send response
        res.status(200).json({message:'user created',userId:result._id})
    })
    .catch(error=>{

        // error handling
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    })
};


/** Login User and return token */

exports.loginUser = async (req, res) => {

    // getting erros from middleware 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    // get values from body
    const { email, password } = req.body;

    // find user and check for passwaord match
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // creating token 
      const token = await jwt.sign(
        { user: { id: user.id, name:user.fullName } },
        process.env.JWT_SECRET,
        { expiresIn: 36000 }
      );

      // sending response back
      if (token) {
        res.json({userId:user._id,email:user.email, token });
      } else {
        throw error;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  };