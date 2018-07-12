import { increment } from './types';
import { changeMe } from './types';

const initialState = { name:"default_name", id:0, sameValue:"unchnaged" };

//this is reducer
export let counter = (state = initialState, action) => {
    switch(action.type)
    {
        case changeMe:
            return {...state,
                    name:action.newname
                };
        case increment:
            return { ...state,
                    id:state.id+1
                };
        default: 
            return state;
    }    
}









