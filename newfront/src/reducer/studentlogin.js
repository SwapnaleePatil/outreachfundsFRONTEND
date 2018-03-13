const studentlogin=(state={user:''},action)=>{
    switch (action.type){
        case 'studentlogin':
            return action.payload
        default:
            return state
    }
}
export default studentlogin;