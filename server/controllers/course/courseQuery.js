const course = require('./../../models/course');

function getCategoryCourses(category) {
    return new Promise((resolve, reject) => {
        course.find({ categories: category }).exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function getAllCourses() {
    return new Promise((resolve, reject) => {
        course.find().exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}



function getAllCategories() {
    return new Promise((resolve, reject) => {
        course.find({}, { _id: 0, categories: 1 }).exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                res = res.reduce((acc, obj) => {
                    obj.categories.forEach(category => {
                        acc.push(category)
                    });
                    return acc
                }, [])
                resolve(res);
            }
        });
    });
}

function getACourse(key) {
    return new Promise((resolve, reject) => {
        course.findOne({ key: key }).exec((err, res) => {
            if (err) {
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
            if (err) {
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
        course.update({ key: key }, data).exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function deleteCourseFromList(key) {
    return new Promise((resolve, reject) => {
        course.remove({ key: key }).exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = {
    getCategoryCourses: getCategoryCourses,
    getAllCourses: getAllCourses,
    getAllCategories: getAllCategories,
    getACourse: getACourse,
    addCourseToList: addCourseToList,
    updateCourseInList: updateCourseInList,
    deleteCourseFromList: deleteCourseFromList
};