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

function getAUser(id) {
    return new Promise((resolve, reject) => {
        user.findOne({id: id}).exec((err, res) => {
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

function updateUserInList(id, data) {
    return new Promise((resolve, reject) => {
        // const userObj = new user(data);
        user.update({id: id}, data).exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function deleteUserFromList(id) {
    return new Promise((resolve, reject) => {
        user.remove({id: id}).exec((err, res) => {
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
    getAUser: getAUser,
    addUserToList : addUserToList,
    updateUserInList: updateUserInList,
    deleteUserFromList: deleteUserFromList
};