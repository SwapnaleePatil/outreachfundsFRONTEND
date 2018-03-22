const businesslogin=(state={},action)=>{
    switch (action.type){
        case 'BUSINESS_LOGIN':
            return action.payload;
        default:
            return state
    }
};
export default businesslogin;