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

function getACourse(key) {
    return new Promise((resolve, reject) => {
        course.findOne({key: key}).exec((err, res) => {
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

function updateCourseInList(key, data) {
    return new Promise((resolve, reject) => {
        // const courseObj = new course(data);
        course.update({key: key}, data).exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function deleteCourseFromList(key) {
    return new Promise((resolve, reject) => {
        course.remove({key: key}).exec((err, res) => {
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
  getACourse: getACourse,
  addCourseToList : addCourseToList,
  updateCourseInList: updateCourseInList,
  deleteCourseFromList: deleteCourseFromList
};