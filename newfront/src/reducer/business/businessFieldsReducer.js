import {BUSINESS_FIELDS} from '../../action/actionTypes';
const businessFieldsReducer= (state=[],action)=>{
    switch(action.type){
        case BUSINESS_FIELDS:
            return action.payload;
        default:
            return state;
    }
}
export default businessFieldsReducer;