const initialState = {};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_FILTER': {
            return {
                ...state,
                filter: action.filter 
            }
        }        
        case 'CLEAR_FILTER': {
            return {
                ...state,
                filter: null 
            }
        }
        default: {
            return state;
        }
    }
};