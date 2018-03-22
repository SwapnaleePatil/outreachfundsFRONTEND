const studentlogin=(state=null,action)=>{
    switch (action.type){
        case 'STUDENT_LOGIN':
            debugger;
            console.log(action.payload);
            return action.payload;
        default:
            return state
    }
}
export default studentlogin;