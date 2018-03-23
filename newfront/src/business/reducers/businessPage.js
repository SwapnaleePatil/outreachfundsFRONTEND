export default (state=0,action)=>{
    switch(action.type){
        case 'BUSINESS_SIGNUP':
            return action.payload;
        default:
            return state;
    }
}