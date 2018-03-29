import _ from 'lodash'
import {ADD_DONATION,GET_DONATION,EDIT_DONATION} from '../../action/actionTypes';

const donationReducer= (state=[],action)=>{
    switch(action.type){
        case ADD_DONATION:
            let temp = state;
            temp.push(action.payload);
            return _.cloneDeep(temp);
        case GET_DONATION:
            return _.cloneDeep(action.payload);
        case EDIT_DONATION:
            let index = [...state].findIndex((donation)=>donation._id===action.payload._id);
            state[index]=action.payload;
            return _.cloneDeep(state);
        default:
            return state;
    }
}
export default donationReducer;