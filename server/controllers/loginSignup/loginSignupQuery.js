const user = require('./../../models/user');

function createToken() {
    let  c_token = Math.random().toString(36).substring(2);
    for(let i=0; i<3; i++) {
        c_token += Math.random().toString(36).substring(2);
    }
    let exp_date = Date.now() + (90*24*3600*1000);
    return {
        c_token: c_token,
        exp_date: exp_date
    }
}

function loginQuery(data) {
    return new Promise((resolve, reject) => {
        user.find(data, {_id : 0, name: 1, email: 1, user_type: 1}).exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                if(res && res.length === 0) {
                    reject({message: 'email or password did match'});
                } else if(res && res.length === 1 && res[0].email === data.email){
                    let token = createToken();
                    user.update(
                        { email: res[0].email },
                        {
                            $push: {
                                tokens: token
                            }
                        },
                        (notUpdated, updated) => {
                            if(notUpdated) {
                                reject({message: 'token could not be saved'});
                            } else {
                                resolve({res: res, token: token});
                            }
                        }
                    );
                } else {
                    reject({message: 'more users exist with same email'});
                }
            }
        });
    });
}

function signupQuery(data) {
    return new Promise((resolve, reject) => {
        user.find({email: data.email}).exec((err1, res1) => {
            if(err1) {
                reject(err1);
            } else {
                if(res1.length > 0) {
                    if(res1.length === 1 && data.signup_type != 'emailAndPassword') {
                        loginQuery({email: res1[0].email, password: res1[0].password})
                        .then(result => {
                            resolve(result);
                        }).catch(error => {
                            reject(error);
                        });
                    } else {
                        reject({message: 'A user Already registered with same Email.'});
                    }
                } else {
                    let userObj = new user(data);
                    userObj.save((err, res) => {
                        if(err) {
                            reject(err);
                        } else {
                            loginQuery({email: data.email, password: data.password})
                            .then(result => {
                                resolve(result);
                            }).catch(error => {
                                reject(error);
                            });
                        }
                    });
                }
            }
        });
    });
}

function logoutQuery(email, cookie) {
    return new Promise((resolve, reject) => {
        user.update(
            { email: email },
            {
                $pull: {
                    tokens: {
                        c_token: cookie
                    } 
                }
            },
            (err, res) => {
                if(err) {
                    reject({message: 'could not logout'});
                } else {
                    resolve({message: 'logout successfully'});
                }
            }
        );
    });
}

function isLoggedQuery(token) {
    token = '' + token;
    let arr = token.split('=');
    token = arr[1];
    return new Promise((resolve, reject) => {
        user.find(
            {'tokens.c_token': token},
            {_id: 0, name: 1, email: 1, user_type: 1}
        ).exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                if(res.length === 0) {
                    resolve({ message: 'not logged in' });
                } else {
                    resolve(res[0]);
                }
            }
        });
    });
}

module.exports = {
    loginQuery: loginQuery,
    signupQuery : signupQuery,
    logoutQuery: logoutQuery,
    isLoggedQuery: isLoggedQuery
};