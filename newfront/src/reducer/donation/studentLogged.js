import {STUDENT_LOGGED_DATA} from '../../action/actionTypes';

const studentLogged= (state=[],action)=>{
    switch (action.type){
        case STUDENT_LOGGED_DATA:
            return action.payload;
        default:
            return state;
    }
}
export default studentLogged;