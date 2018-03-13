const businesslogin=(state=[],action)=>{
    switch (action.type){
        case 'businesslogin':
            return action.payload;
        default:
            return state
    }
};
export default businesslogin;