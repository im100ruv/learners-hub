const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    mobile: String,
    user_type: String
});

module.exports = mongoose.model('user', schema);