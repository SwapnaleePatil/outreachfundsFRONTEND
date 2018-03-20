export default (state=[],action)=>{
    switch (action.type){
        case 'STUDENT_LOGGED_DATA':
            return action.payload;
        default:
            return state;
    }
}