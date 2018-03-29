import {EVENTS_SPONSER} from '../../action/actionTypes';
const scheduleEventBySponser=(state=[],action)=> {
    switch (action.type) {
        case EVENTS_SPONSER:
            return action.payload
        default:
            return state;
    }
}
export default scheduleEventBySponser;