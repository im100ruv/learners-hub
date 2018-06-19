const query = require('./userQuery');

function getUsersList(request, response) {
    query.getAllUsers()
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function addUser(request, response) {
    query.addUserToList(request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

module.exports = {
    getUsersList: getUsersList,
    addUser: addUser
};