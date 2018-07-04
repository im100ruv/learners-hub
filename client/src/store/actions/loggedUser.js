import store from '../store';

function addLoggedUser(user) {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

function removeLoggedUser() {
    return {
        type: 'REMOVE_USER'
    }
}

export default {
    addLoggedUser: addLoggedUser,
    removeLoggedUser: removeLoggedUser
}