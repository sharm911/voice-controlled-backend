const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// getting routes
const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const deviceRoutes = require('./routes/device');
const routineRoutes = require('./routes/routine');

//  port for hosting
const port =  process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json()); // application/json



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// using routes
app.use('/users', userRoutes);
app.use('/room', roomRoutes);
app.use('/device', deviceRoutes);
app.use('/routine', routineRoutes);

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({mesage:message,data:data})
})

// Database connection and listening app at port
mongoose.connect(process.env.MONGODB_URI,{
	useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(result=>{
	app.listen(port,()=>console.log(`Listening at PORT ${port}`));
})
.catch(error=>{
    console.log(error)
})

