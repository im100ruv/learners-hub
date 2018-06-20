const user = require('./../../models/user');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        user.find({}, {_id:0, id:1, name:1, email:1, mobile:1, user_type:1})
        .exec((err, res) => {
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
        user.findOne({id: id}, {_id:0, id:1, name:1, email:1, mobile:1, user_type:1})
        .exec((err, res) => {
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