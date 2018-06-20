const userControllers = require('./controllers/user/userController')
const courseControllers = require('./controllers/course/courseController')

function setup(app){
    app.get('/', rootRoute);

    app.get('/users', userControllers.getUsersList);
    app.get('/users/:id', userControllers.getUser);
    app.post('/users', userControllers.addUser);
    app.put('/users/:id', userControllers.updateUser);
    app.delete('/users/:id', userControllers.deleteUser);

    app.get('/courses', courseControllers.getCoursesList);
    app.get('/courses/:category', courseControllers.getCoursesByCategory);
    app.get('/courses/:key', courseControllers.getCourse);
    app.post('/courses', courseControllers.addCourse);
    app.put('/courses/:key', courseControllers.updateCourse);
    app.delete('/courses/:key', courseControllers.deleteCourse);
};

function rootRoute(req, res) {
    res.send({message: 'hello'})
}

module.exports = {
    setup : setup
};