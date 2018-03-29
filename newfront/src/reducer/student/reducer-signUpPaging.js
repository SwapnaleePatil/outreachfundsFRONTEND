import {CHANGE_SIGNUP_PAGE} from '../../action/actionTypes';

const signupPageReducer=(state=0,action)=>{
    switch(action.type){
        case CHANGE_SIGNUP_PAGE:
            return action.payload;
        default:
            return state;
    }
}
export default signupPageReducer