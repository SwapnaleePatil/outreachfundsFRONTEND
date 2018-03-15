export default (state=[],action)=>{
    switch (action.type){
        case 'FETCH_SCHOOLS':
            console.log("in reducer - ",action.payload);
            return action.payload;
        case "REGISTER_SCHOOL":
            return [...state,action.payload];
        default:
            return state;
    }
}