import {BUSINESS_LIST} from '../../action/actionTypes';
const businesslist=(state=[],action)=>{
    switch (action.type){
        case BUSINESS_LIST:
            return action.payload
        default:
            return state
    }
}
export default businesslist;