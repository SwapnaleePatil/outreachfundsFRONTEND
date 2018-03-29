import {SCHEDULE_EVENT,EVENT_LIST,ACTION_ON_EVENT} from '../../action/actionTypes';
import _ from 'lodash'
const scheduleEvent=(state=[],action)=>{
    switch (action.type){
        case SCHEDULE_EVENT:
            state.push(action.payload)
        return _.cloneDeep(state);
        case EVENT_LIST:
            return action.payload
        case ACTION_ON_EVENT:
            let eid= state.map(x=>x._id).indexOf(action.payload._id)
              if(action.payload.status===false){
                state.splice(eid,1);
              }
              else {
                  state.splice(eid, 1, action.payload);
              }
              return _.cloneDeep(state);
        default:
            return state
    }
}
export default scheduleEvent;