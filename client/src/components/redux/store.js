import {combineReducers} from 'redux';
import {createStore} from 'redux';
import {counter} from './reducer';
import {counterTwo} from './reducerTwo';

let ABC =  combineReducers({
    tasks: counter,
    newtasks: counterTwo
});

export const store = createStore(ABC);