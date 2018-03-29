import {GET_BUSINESS_BY_TOKEN} from '../../action/actionTypes';

const getBusinessId= (state=[],action)=>{
    switch(action.type){
        case GET_BUSINESS_BY_TOKEN:
            state=action.payload;
            return state;
        default:
            return state;
    }
}
export default getBusinessId;