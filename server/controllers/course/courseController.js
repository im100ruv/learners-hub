const query = require('./courseQuery');

function getCoursesList(request, response) {
    query.getAllCourses()
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function getCourse(request, response) {
    query.getACourse(request.params.key)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function addCourse(request, response) {
    query.addCourseToList(request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function updateCourse(request, response) {
    query.updateCourseInList(request.params.key, request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function deleteCourse(request, response) {
    query.deleteCourseFromList(request.params.key)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

module.exports = {
  getCoursesList: getCoursesList,
  getCourse: getCourse,
  addCourse: addCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse
};