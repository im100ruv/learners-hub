import { Age } from './types';

const initialState = { Age: 1 };

//this is reducer
export let counterTwo = (state = initialState, action) => {
    switch(action.type)
    {
        case Age:
            return {
                    ...state,
                    Age: state.Age + 1  
                };
        default: 
            return state;
    }    
}
