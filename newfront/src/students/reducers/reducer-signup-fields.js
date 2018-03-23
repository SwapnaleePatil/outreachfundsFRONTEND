export default (state=[],action)=>{
    switch(action.type){
        case "SIGNUP_PAGE_FIELDS":
            return action.payload;
        default:
            return state;
    }
}