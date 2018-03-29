import {GET_EVENTS} from '../../action/actionTypes';

const eventReducer=(state=[],action)=>{
    switch(action.type){
        case GET_EVENTS:
            state=action.payload;
            return state;
        default:
            return state;
    }
}
 export default eventReducer;