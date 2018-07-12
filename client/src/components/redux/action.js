import {store} from './store';
import { increment } from './types';
import { changeMe } from './types';

export let change = (value) =>{
    let changeName = { type:changeMe, newname:value };
    store.dispatch(changeName);
}

store.subscribe(() =>{
    console.log(store.getState());
})

//actions being dispatched!!
let inc = {type:increment};
store.dispatch(inc);
store.dispatch(inc);
change("SuperMan");
store.dispatch(inc);
store.dispatch(inc);
change("PerMan");
change("HooMan");

