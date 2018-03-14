export default (state=[],action)=>{
    switch(action.type){
        case 'BUSINESS_ADD':
            return [...state,action.payload];
        default:
            return state;
    }
}