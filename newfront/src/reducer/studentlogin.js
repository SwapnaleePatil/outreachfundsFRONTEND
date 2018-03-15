const studentlogin=(state={user:''},action)=>{
    switch (action.type){
        case 'STUDENT_LOGIN':
            return action.payload
        default:
            return state
    }
}
export default studentlogin;