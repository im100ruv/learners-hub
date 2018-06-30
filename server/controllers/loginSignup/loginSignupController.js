const query = require('./loginSignupQuery');

function login(request, response) {
    query.loginQuery(request.body)
    .then(res => {
        response.cookie('c_token', res.token.c_token, {maxAge: 7776000000});
        response.send(res.res[0]);
    }).catch(err => {
        response.send(err);
    });
}

function signup(request, response) {
    query.signupQuery(request.body)
    .then(res => {
        response.cookie('c_token', res.token.c_token, {maxAge: 7776000000});
        response.send(res.res[0]);
    }).catch(err => {
        response.send(err);
    });
}

function logout(request, response) {
    query.logoutQuery(request.params.email, request.headers.cookie)
    .then(res => {
        response.clearCookie('c_token');
        response.send(res);
    }).catch(err => {
        response.send(err);
    });
}

module.exports = {
    login: login,
    signup: signup,
    logout: logout
};