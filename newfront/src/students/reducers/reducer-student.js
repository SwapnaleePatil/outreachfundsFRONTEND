export default (state=[],action)=>{
    switch(action.type){
        case "REGISTER_STUDENT":
            return [...state,action.payload];
        case 'FETCH_STUDENT':
            return action.payload;
        case 'STUDENT_UPDATE':
            let arr=[...state];
            let index=arr.findIndex((u)=>u._id===action.payload._id);
            arr.splice(index,1);
            arr.splice(index,0,action.payload);
            return arr;
        default:
            return state;
    }
}
