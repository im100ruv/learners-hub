const query = require('./courseQuery');

function getCoursesList(request, response) {
    query.getAllCourses()
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

module.exports = {
  getCoursesList: getCoursesList,
  addCourse: addCourse
};