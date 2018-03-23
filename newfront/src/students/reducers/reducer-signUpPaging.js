export default (state=0,action)=>{
    switch(action.type){
        case "CHANGE_SIGNUP_PAGE":
            return action.payload;
        default:
            return state;
    }
}