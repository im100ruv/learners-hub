const user = require('./../../models/user');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        user.find().exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function addUserToList(data) {
    return new Promise((resolve, reject) => {
        const userObj = new user(data);
        userObj.save().exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = {
    getAllUsers : getAllUsers,
    addUserToList : addUserToList
};