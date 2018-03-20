export default (state=[],action)=>{
    switch(action.type){
        case 'BUSINESS_ADD':
            return [...state,action.payload];
        default:
            return state;
    }
}
export default (state=[],action)=>{
    switch(action.type){
        case 'BUSINESS_UPDATE':
            let arr=[...state];
            let index=arr.findIndex((u)=>u._id===action.payload._id);
            arr.splice(index,1);
            arr.splice(index,0,action.payload);
            return arr;
        default:
            return state;
    }
}