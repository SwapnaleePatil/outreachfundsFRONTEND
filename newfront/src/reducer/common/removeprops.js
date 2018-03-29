//import {REMOVE_PROPS} from '../../action/actionTypes';

const propsremover=(state=[],action)=>{
    switch (action.type){
        case 'REMOVE_PROPS':
            return action.payload;
        default:
            return state
    }
};
export default propsremover;