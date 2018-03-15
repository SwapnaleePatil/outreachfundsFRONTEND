export default (state=[],action)=>{
    switch (action.type){
        case 'FETCH_SCHOOLS':
            console.log("in reducer - ",action.payload);
            return action.payload;
        default:
            return state;
    }
}