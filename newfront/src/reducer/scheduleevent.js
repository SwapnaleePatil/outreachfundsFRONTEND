import _ from 'lodash'
const scheduleEvent=(state=[],action)=>{
    switch (action.type){
        case 'SCHEDULE_EVENT':
            state.push(action.payload)
        return _.cloneDeep(state);
        case 'EVENT_LIST':
            return action.payload
        default:
            return state
    }
}
export default scheduleEvent;