
import axios from 'axios';
export const  studentLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:''}).then((response)=>{
            if(response){
                dispatch({
                    type:'STUDENT_LOGIN',
                    payload:response.data
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};

export const  businessLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:''}).then((response)=>{
        if(response){
            dispatch({
                type:'BUSINESS_LOGIN',
                payload:response.data
            })
        }
        }).catch((e)=>{
            console.log(e);
        })
    }
};