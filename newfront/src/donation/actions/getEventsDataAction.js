import axios from 'axios';

export const getEventDataAction=()=>{
    return ((dispatch)=>{
        axios.get('http://localhost:4000/api/event').then((response)=>{
            dispatch({
                type:'GET_EVENTS',
                payload:response.data.record
            });
            console.log('event',response.data.record)
        }).catch((err)=>{
            console.log(err);
        })
    });
}