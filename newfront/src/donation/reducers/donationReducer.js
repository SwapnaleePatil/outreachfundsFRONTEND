import _ from 'lodash'

export default (state=[],action)=>{
    switch(action.type){
        case 'ADD_DONATION':
            let temp = state;
            temp.push(action.payload);
            console.log(temp);
            return _.cloneDeep(temp);
        case 'GET_DONATION':
            return _.cloneDeep(action.payload);
        case 'EDIT_DONATION':
            let index = [...state].findIndex((donation)=>donation._id===action.payload._id);
            state[index]=action.payload;
            return _.cloneDeep(state);
        default:
            return state;
    }
}