import {LOG_OUT,FETCH_BUSINESS} from '../../action/actionTypes';
const loginuser= (state = [], action) => {
    switch (action.type) {
        case FETCH_BUSINESS:
            return action.payload;
        case LOG_OUT:
            return state = []
        default:
            return state;
    }
}
export default loginuser;