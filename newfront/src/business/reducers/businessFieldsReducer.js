export default (state=[],action)=>{
    debugger
    switch(action.type){
        case 'BUSINESS_FIELDS':
            return action.payload;
        default:
            return state;
    }
}