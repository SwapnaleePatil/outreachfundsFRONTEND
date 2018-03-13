export default (state=0,action)=>{
    switch(action.type){
        case "CHANGE_SIGNUP_PAGE":
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}