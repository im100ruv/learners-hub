const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    mobile: String,
    user_type: String,
    signup_type: String,
    tokens: [{
        c_token: String,
        exp_date: Number
    }]
});

module.exports = mongoose.model('user', schema);