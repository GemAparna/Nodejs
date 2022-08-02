const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const studentRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user')

//db connection
mongoose.connect("mongodb+srv://Aparna2312:Appu76688@firstone.udnwi7j.mongodb.net/?retryWrites=true&w=majority");

mongoose.connection.on('error',err=>{
    console.log("connection failed");
});

mongoose.connection.on('connected',connected=>{
    console.log("connection set with database");
});


//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routing
app.use('/student',studentRoute);
app.use('/user',userRoute);


// app.use((req, res, next)=>{
//     res.status(200).json({
//         message:'app is running'
//     })
// })

app.use((req, res, next)=>{
    res.status(401).json({
        error:'bad request'
    })
})


module.exports = app;