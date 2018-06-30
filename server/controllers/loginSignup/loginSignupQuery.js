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
        user.find(data, {id : 1, email: 1, user_type: 1}).exec((err, res) => {
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
                    if(res1.length === 1 && res1[0].signup_type != 'emailAndPassword') {
                        reject({message: 'look like you had looged in using ' + res1[0].signup_type + ' but not created password yet.'});
                    } else {
                        reject({message: 'A user Allready exist with same Email'});
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

module.exports = {
    loginQuery: loginQuery,
    signupQuery : signupQuery,
    logoutQuery: logoutQuery
};