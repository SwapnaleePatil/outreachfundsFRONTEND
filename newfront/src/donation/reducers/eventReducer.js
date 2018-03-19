export default (state=[],action)=>{
    switch(action.type){
        case 'GET_EVENTS':
            state=action.payload;
            return state;
        default:
            return state;
    }
}