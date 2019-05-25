var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const userModel = require('./api/controllers/user/user')
const config = require('./config-local.json');
const userRouter = require('./api/controllers/user/router');
const auth = require('./api/auth');
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
        auth(app, userModel);
        const port = process.env.PORT || 8000;
        app.get("/", (req, res)=> {
            res.send("Hello");
        })
        app.listen(port, err => {
            if(err) console.log(err);
            else console.log("Server is running...")
        })
    }
});

