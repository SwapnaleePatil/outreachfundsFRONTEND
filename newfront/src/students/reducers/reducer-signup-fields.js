export default (state=[],action)=>{
    switch(action.type){
        case "SIGNUP_PAGE_FIELDS":
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}