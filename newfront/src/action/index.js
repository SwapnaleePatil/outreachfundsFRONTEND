
import axios from 'axios';

export const  businessLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:'http://localhost:3000/api/businessOwner/loginPassport',data}).then((response)=>{
        if(response){
            dispatch({
                type:'BUSINESS_LOGIN',
                payload:response
            })
            console.log('login',response.data);
            if(response.data==="success") {
                console.log('login', response.data);
                localStorage.setItem('user', response.data);
                window.location = "/home"
            }
        }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
export const  studentLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:'http://localhost:3000/api/student/login',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'STUDENT_LOGIN',
                    payload:response
                })
                console.log('login',response.data);
                if(response.data==="success") {
                    console.log('login', response.data);
                    localStorage.setItem('user', response.data);
                    window.location = "/home"
                }
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
export const getevents=()=>{
    return(dispatch)=>{
        axios({method:'get',url:''}).then((response)=>{
            if(response){
                dispatch({
                    type:''
                })
            }
        })
    }
}