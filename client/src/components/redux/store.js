import {createStore} from 'redux';
import {counter} from './reducer';
import { increment } from './types';
import { changeMe } from './types';

const store = createStore(counter);

console.log(store.getState());

let change = (value) =>{
    let changeName = { type:changeMe, newname:value };
    store.dispatch(changeName);
}

store.subscribe(() =>{
    console.log(store.getState());
})

let inc = {type:increment};
store.dispatch(inc);
store.dispatch(inc);
change("SuperMan");
store.dispatch(inc);
store.dispatch(inc);
change("PerMan");









