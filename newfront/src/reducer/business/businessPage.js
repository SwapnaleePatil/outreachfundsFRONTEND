import {BUSINESS_SIGNUP,} from '../../action/actionTypes';
const businessSignUpPageReducer= (state=0,action)=>{
    switch(action.type){
        case BUSINESS_SIGNUP:
            return action.payload;
        default:
            return state;
    }
}
export default businessSignUpPageReducer;