import {store} from './store';
import { increment } from './types';
import { changeMe } from './types';

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

