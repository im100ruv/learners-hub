import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let state = {
    loggedUser : {
        name: null,
        email: null,
        user_type: null
    }
};

let middleware = applyMiddleware(thunk);

export default createStore(rootReducer, state, middleware);