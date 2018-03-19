import _ from 'lodash'
const scheduleEvent=(state=[],action)=>{
    switch (action.type){
        case 'SCHEDULE_EVENT':
            state.push(action.payload)
        return _.cloneDeep(state);
        case 'EVENT_LIST':
            return action.payload
        case 'ACTION_ON_EVENT':
            debugger;
           let id= state.map(x=>x._id).indexOf(action.payload._id)
                state.splice(id, 1, action.payload);
                return _.cloneDeep(state);
        default:
            return state
    }
}
export default scheduleEvent;