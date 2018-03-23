export default (state=[],action)=>{
    switch(action.type){
        case "REGISTER_STUDENT":
            return [...state,action.payload];
        case 'FETCH_STUDENT':
            return action.payload;
        case 'STUDENT_UPDATE':
            return action.payload;
        default:
            return state;
    }
}
