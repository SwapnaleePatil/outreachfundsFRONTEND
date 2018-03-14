
export default (state=0,action)=>{
    debugger
    switch(action.type){
        case 'BUSINESS_SIGNUP':
            console.log("action",action.payload);
            return action.payload;
        default:
            return state;
    }
}