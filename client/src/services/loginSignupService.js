function loginRequest(data) {
    let url = 'http://localhost:8000/api/login';
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
    let url = 'http://localhost:8000/api/signup';
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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

export default {
    loginRequest: loginRequest,
    signupRequest: signupRequest
}