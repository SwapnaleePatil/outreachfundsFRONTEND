export default (state=[],action)=>{
    switch(action.type){
        case 'GET_DONATION':
            state=action.payload;
            return state;
        case 'ADD_DONATION':
            let temp = state;
            temp.push(action.payload);
            return temp;
        default:
            return state;
    }
}