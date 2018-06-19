const userControllers = require('./controllers/user/userController')

function setup(app){
    app.get('/', rootRoute);
    app.get('/users', userControllers.getUsersList);
    app.post('/users', userControllers.addUser)
};

function rootRoute(req, res) {
    res.send({message: 'hi'})
}

module.exports = {
    setup : setup
};