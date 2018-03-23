const login=(state={},action)=>{
    switch (action.type){
        case 'STUDENT_LOGIN':
            debugger;
            console.log(action.payload);
            return action.payload;
        case 'BUSINESS_LOGIN':
            return action.payload;
        default:
            return state
    }
}
export default login;