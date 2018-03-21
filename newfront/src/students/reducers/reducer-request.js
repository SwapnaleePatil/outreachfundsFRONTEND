export default (state=[],action)=>{
    switch(action.type){
        case "FETCH_REGISTER_REQUEST":
            return action.payload;
        case "APPROVE_REQUEST":
            let approvedArr=action.payload;
            let len=approvedArr.length;
            let st=[...state];
            debugger;
            for(let i=0;i<len;i++){
                st=st.filter((req)=>req._id!==approvedArr[i])
            }
            return st;
        case "REJECT_REQUEST":
            let rejectedArr=action.payload;
            let l=rejectedArr.length;
            let str=[...state];
            debugger;
            for(let i=0;i<l;i++){
                str=str.filter((req)=>req._id!==rejectedArr[i])
            }
            return str;
        default:
            return state;
    }
}