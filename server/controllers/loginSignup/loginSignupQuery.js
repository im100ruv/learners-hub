const user = require('./../../models/user');

function createToken() {
    let  c_token = Math.random().toString(36).substring(2);
    const date = new Date;
    let exp_date = date.getTime() + (90*24*3600*1000);
    const exp = new Date(exp_date);
    c_token = "c_token=" + c_token + "; expires=" + exp + ";";
    return {
        c_token: c_token,
        exp_date: exp_date
    }
}

function loginQuery(data) {
    return new Promise((resolve, reject) => {
        user.find(data, {_id : 1, email: 1}).exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                if(res.length === 1 && res[0].email === data.email){
                   let token = createToken();
                   const userObj = new user(token);
                   console.log(token);
                   resolve({res: res, token: token});
                }
            }
        });
    });
}

function signupQuery(data) {
    return new Promise((resolve, reject) => {
        const userObj = new user(data);
        userObj.save().exec((err, res) => {
            if(err) {
                reject(err);
            } else {
                console.log(res);
                loginQuery({email: data.email, password: data.password})
                .then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
            }
        });
    });
}

module.exports = {
    loginQuery: loginQuery,
    signupQuery : signupQuery
};