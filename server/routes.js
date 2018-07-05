const userControllers = require('./controllers/user/userController');
const courseControllers = require('./controllers/course/courseController');
const loginSignupController = require('./controllers/loginSignup/loginSignupController')

function setup(app){
    // root routers
    app.all('/', rootRoute);
    app.all('/api/', apiRoute);

    // users
    app.get('/api/users', userControllers.getUsersList);
    app.get('/api/users/:id', userControllers.getUser);
    app.put('/api/users/:id', userControllers.updateUser);
    app.delete('/api/users/:id', userControllers.deleteUser);
    
    app.put('/api/users/courses/enrolled', userControllers.enrollCourse);
    app.put('/api/users/courses/authored', userControllers.authoredCourse);

    // courses
    // use http://localhost:8000/api/courses to get all courses
    // use http://localhost:8000/api/courses?category=Python to get courses by category(eg: Python)
    app.get('/api/courses', courseControllers.getCoursesList);
    app.get('/api/courses/categories', courseControllers.getCategoriesList);
    app.get('/api/courses/:key', courseControllers.getCourse);
    app.post('/api/courses', courseControllers.addCourse);
    app.put('/api/courses/:key', courseControllers.updateCourse);
    app.delete('/api/courses/:key', courseControllers.deleteCourse);


    // login-signup
    app.post('/api/login', loginSignupController.login);
    app.post('/api/signup', loginSignupController.signup);
    app.get('/api/logout/:email', loginSignupController.logout);
    app.get('/api/is-logged', loginSignupController.isLogged);
};

function rootRoute(req, res) {
    res.send({message: 'Welcome to home page'});
}

function apiRoute(req, res) {
    res.send({message: 'You are accessing the API for LearnersHub. Please request for specific resource to get corresponding responses.'})
}

module.exports = {
    setup : setup
};