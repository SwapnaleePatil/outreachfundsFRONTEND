const studentlogin=(state=[],action)=>{
    switch (action.type){

        case 'STUDENT_LOGIN':
            return action.payload
        default:
            return state
    }
}
export default studentlogin;