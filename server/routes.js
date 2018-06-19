const userControllers = require('./controllers/user/userController')
const courseControllers = require('./controllers/course/courseController')

function setup(app){
    app.get('/', rootRoute);
    app.get('/users', userControllers.getUsersList);
    app.post('/users', userControllers.addUser);
    app.get('/courses', courseControllers.getCoursesList);
    app.post('/courses', courseControllers.addCourse);
};

function rootRoute(req, res) {
    res.send({message: 'hi'})
}

module.exports = {
    setup : setup
};