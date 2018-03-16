export default (state=[],action)=>{
    switch(action.type){
        case "FETCH_REGISTER_REQUEST":
            return action.payload;
        default:
            return state;
    }
}