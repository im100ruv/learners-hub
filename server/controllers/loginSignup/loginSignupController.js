const query = require('./loginSignupQuery');

function login(request, response) {
    query.loginQuery(request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

function signup(request, response) {
    query.signupQuery(request.body)
    .then(res => {
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

module.exports = {
    login: login,
    signup: signup
};