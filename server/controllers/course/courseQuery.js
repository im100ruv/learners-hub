const course = require('./../../models/course');

function getAllCourses() {
    return new Promise((resolve, reject) => {
        course.find().exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function addCourseToList(data) {
    return new Promise((resolve, reject) => {
        const courseObj = new course(data);
        courseObj.save().exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = {
  getAllCourses : getAllCourses,
  addCourseToList : addCourseToList
};