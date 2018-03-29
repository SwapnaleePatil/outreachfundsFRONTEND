import {SIGNUP_PAGE_FIELDS} from '../../action/actionTypes';

const signupPageFieldsReducer=(state=[],action)=>{
    switch(action.type){
        case SIGNUP_PAGE_FIELDS:
            return action.payload;
        default:
            return state;
    }
}
export default signupPageFieldsReducer