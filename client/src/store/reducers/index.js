import { combineReducers } from 'redux';
//all reducers
import loggedUser from '../reducers/loggedUser';

export default combineReducers({
    // export all reducers
    loggedUser: loggedUser
});