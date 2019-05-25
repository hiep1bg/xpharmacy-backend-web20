var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./config-local.json');
const userRouter = require('./api/controllers/user/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(config.MONGODB,{ useNewUrlParser: true }, err => {
    if(err) console.log(err);
    else{
        console.log("Successful connect to mongodb...");    
        app.use("/api/user", userRouter);

        app.listen(8000, err => {
            if(err) console.log(err);
            else console.log("Server is running...")
        })
    }
});

