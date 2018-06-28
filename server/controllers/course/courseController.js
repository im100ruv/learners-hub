const query = require('./courseQuery');
const firebaseAdmin = require('firebase-admin');

function getCoursesList(request, response) {
    if (request.query.category) {
        query.getCategoryCourses(request.query.category)
            .then(res => {
                response.send(res);
            }).catch(err => {
                response.send(err);
            });
    } else {
        query.getAllCourses()
            .then(res => {
                response.send(res);
            }).catch(err => {
                response.send(err);
            });
    }
}

function getCategoriesList(request, response) {
    query.getAllCategories()
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
    if (!(request.body["banner_image"] == "")) {
        let storageRef = firebaseAdmin.storage().ref('courses/banner/')
        let extension = request.body["banner_image"].name.split('.').pop()
        let bannerImgRef = storageRef.child(`${request.body["title"]}.${extension}`)
        let uploadTask = bannerImgRef.put(request.body["banner_image"])

        uploadTask.on('state_changed', snapshot => {
            // code for progress
        }, err => {
            // error handling here
            // use err.code to handle specific errors
        }, () => {
            // code after upload completion
            snapshot.ref.getDownloadURL().then(url => {
                request.body["banner_image"] = url
                query.addCourseToList(request.body)
                    .then(res => {
                        response.send(res);
                    }).catch(err => {
                        response.send(err);
                    });
            })
        })
    } else {
        firebaseAdmin.storage().ref('courses/banner/').child('default.jpg').getDownloadURL().then(url => {
            request.body["banner_image"] = url
            query.addCourseToList(request.body)
                .then(res => {
                    response.send(res);
                }).catch(err => {
                    response.send(err);
                });
        })
    }
}

function updateCourse(request, response) {
    if (!(request.body["banner_image"] == "")) {
        let storageRef = firebaseAdmin.storage().ref('courses/banner/')
        let extension = request.body["banner_image"].name.split('.').pop()
        let bannerImgRef = storageRef.child(`${request.body["title"]}.${extension}`)
        let uploadTask = bannerImgRef.put(request.body["banner_image"])

        uploadTask.on('state_changed', snapshot => {
            // code for progress
        }, err => {
            // error handling here
            // use err.code to handle specific errors
        }, () => {
            // code after upload completion
            snapshot.ref.getDownloadURL().then(url => {
                request.body["banner_image"] = url
                query.updateCourseInList(request.params.key, request.body)
                    .then(res => {
                        response.send(res);
                    }).catch(err => {
                        response.send(err);
                    });
            })
        })
    } else {
        firebaseAdmin.storage().ref('courses/banner/').child('default.jpg').getDownloadURL().then(url => {
            request.body["banner_image"] = url
            query.updateCourseInList(request.params.key, request.body)
                .then(res => {
                    response.send(res);
                }).catch(err => {
                    response.send(err);
                });
        })
    }
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
    getCategoriesList: getCategoriesList,
    getCourse: getCourse,
    addCourse: addCourse,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse
};