function loggedUser(currentState=null, action) {
    let nextState = Object.assign({}, currentState);

    switch(action.type) {
        case 'ADD_USER':
            nextState = action.payload;
            return nextState;

        case 'REMOVE_USER':
            nextState = {
                name: null,
                email: null,
                user_type: null
            };
            return nextState;

        default: return currentState;
    }
}

export default loggedUser;