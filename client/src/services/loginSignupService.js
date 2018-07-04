import config from '../config/config.json'

function loginRequest(data) {
    let url = `${config.APIHostName}:${config.APIHostingPort}/api/login` ;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(result => {
            return result.json();
        }).then(resultData => {
            resolve(resultData);
        }).catch(error => {
            reject(error);
        });
    });
}

function signupRequest(data) {
    let url = `${config.APIHostName}:${config.APIHostingPort}/api/signup`;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(result => {
            return result.json();
        }).then(resultData => {
            resolve(resultData);
        }).catch(error => {
            reject(error);
        });
    });
}

function logoutRequest(email) {
    let url = `${config.APIHostName}:${config.APIHostingPort}/api/logout/${email}`;
    let cookie = document.cookie;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Cookie": cookie
            },
            credentials: 'include'
        }).then(result => {
            return result.json();
        }).then(resultData => {
            resolve(resultData);
        }).catch(error => {
            reject(error);
        });
    });
}

function checkLoginRequest() {
    let url = `${config.APIHostName}:${config.APIHostingPort}/api/is-logged`;
    let cookie = document.cookie;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Cookie": cookie
            },
            credentials: 'include'
        }).then(result => {
            return result.json();
        }).then(resultData => {
            resolve(resultData);
        }).catch(error => {
            reject(error);
        });
    });
}

export default {
    loginRequest: loginRequest,
    signupRequest: signupRequest,
    logoutRequest: logoutRequest,
    checkLoginRequest: checkLoginRequest
}