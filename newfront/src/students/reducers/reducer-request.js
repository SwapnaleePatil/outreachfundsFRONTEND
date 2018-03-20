export default (state=[],action)=>{
    switch(action.type){
        case "FETCH_REGISTER_REQUEST":
            debugger;
            return action.payload;
        case "APPROVE_REQUEST":
            var arr=action.payload;
            for(let i=0;i<arr.length;i++){
                arr=[...state].filter((req)=>req._id!==arr[i])
            }
            return arr;
        case "REJECT_REQUEST":
            var arr=action.payload;
            for(let i=0;i<arr.length;i++){
                arr=[...state].filter((req)=>req._id!==arr[i])
            }
            return arr;
        default:
            return state;
    }
}