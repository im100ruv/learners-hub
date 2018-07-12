import {combineReducers} from 'redux';
import {createStore} from 'redux';
import {counter} from './reducer';
import {counterTwo} from './reducerTwo';

let the_combined_reducer =  combineReducers({
    firstReducer : counter,
    secondReducer : counterTwo
});

export const store = createStore(the_combined_reducer);