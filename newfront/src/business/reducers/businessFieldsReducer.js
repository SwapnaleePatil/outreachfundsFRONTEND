export default (state=[],action)=>{

    switch(action.type){
        case 'BUSINESS_FIELDS':
            return action.payload;
        default:
            return state;
    }
}