import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let initialState = {
    loggedUser : {}
};

let middleware = applyMiddleware(thunk);

export default createStore(rootReducer, initialState, middleware);