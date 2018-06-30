const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: String,
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