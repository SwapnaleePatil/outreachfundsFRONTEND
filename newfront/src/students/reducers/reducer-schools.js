export default (state=[],action)=>{
    switch (action.type){
        case 'FETCH_SCHOOLS':
            console.log("in reducer - ",action.payload);
            return action.payload;
        case "REGISTER_SCHOOL":
            return [...state,action.payload];
        case 'SCHOOL_UPDATE':
            let arr=[...state];
            let index=arr.findIndex((u)=>u._id===action.payload._id);
            arr.splice(index,1);
            arr.splice(index,0,action.payload);
            return arr;
        default:
            return state;
    }
}