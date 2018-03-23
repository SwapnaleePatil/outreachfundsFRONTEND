// import _ from 'lodash'
const scheduleEventBySponser=(state=[],action)=> {
    switch (action.type) {
        case 'EVENTS_SPONSER':
            return action.payload
        default:
            return state;
    }
}
export default scheduleEventBySponser;