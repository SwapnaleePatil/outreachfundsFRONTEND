export default (state=[],action)=>{
    switch(action.type){
        case 'GET_BUSINESS_BY_TOKEN':
            state=action.payload;
            return state;
        default:
            return state;
    }
}