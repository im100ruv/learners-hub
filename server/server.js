const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const routes = require('./routes');
const app = express();

mongoose.connect(config.db)
.then(success => {

    console.log("DB is Connected");
}).catch(err => {
    console.log("DB is not Connected");
    process.exit();
});