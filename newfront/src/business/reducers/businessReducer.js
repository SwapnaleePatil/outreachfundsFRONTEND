const businesslist=(state=[],action)=>{
    debugger
    switch (action.type){
        case 'BUSINESS_LIST':
            return action.payload
        default:
            return state
    }
}
export default businesslist;