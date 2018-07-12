import {createStore} from 'redux';
import {counter} from './reducer';
import { increment } from './types';
import { changeMe } from './types';

export const store = createStore(counter);










