const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const routes = require('./routes');
const app = express();

let auth = (req, res, next) => {
    let path = req.path;
    if(path === '/api/login' || '/api/signup') {
        // res.clearCookie('c_token');
        next();
    } else {
        if(req.cookies.c_token) {
            next();
        } else {
            // res.send({ message: 'Unauthorized Request' });
            next();
        }
    }
}

app.listen(config.hostingPort, function(){
    console.log('Listing on port no. :', config.hostingPort);
    console.log(`Go To => ${config.hostName}:${config.hostingPort}`);

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //client address
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(auth);

    //static directory
    mongoose.connect(config.localDB)
    .then(success => {
        console.log('DB is Connected');
        routes.setup(app);
    }).catch(err => {
        mongoose.connection.close().then(() => {
            console.log('DB could not Connected');
            console.log(err.message);
        });
    });
}).on('error', function(err) {
    if(err.code == 'EADDRINUSE') {
        console.log('Port No.: ' + config.remotePort +' is already occupied');
        console.log('Server is not runnig');
    } else {
        console.log(err);
        console.log('Server is not runnig');
    }
    mongoose.connection.close().then(() => {
        console.log('DB connection closed');
    });
});
