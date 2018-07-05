const query = require('./userQuery');

function getUsersList(request, response) {
    query.getAllUsers()
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function getUser(request, response) {
    query.getAUser(request.params.id)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function updateUser(request, response) {
    query.updateUserInList(request.params.id, request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function deleteUser(request, response) {
    query.deleteUserFromList(request.params.id)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function enrollCourse(request, response) {
    query.enrollCourseQuery(request.body.email, request.body.course)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function authoredCourse(request, response) {
    query.authoredCourseQuery(request.body.email, request.body.course)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

module.exports = {
    getUsersList: getUsersList,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,

    enrollCourse: enrollCourse,
    authoredCourse: authoredCourse
};