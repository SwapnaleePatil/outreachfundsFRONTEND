import axiosI from '../services/axiosInstance';
import axios from 'axios';
export const  businessLogin=(data)=>{
    return (dispatch)=>{
        axiosI({method:'post',url:'api/businessOwner/loginPassport',data}).then((response)=>{

           if(response.data.message==="login successful"){
                dispatch({
                    type:'BUSINESS_LOGIN',
                    payload:response
                });
                console.log('login', response.data);
                localStorage.setItem('user', response.data.token);
                window.location = "/home"
            }

        }).catch((e)=>{
            console.log(e);
        })
    }
};
export const  studentLogin=(data)=>{
    debugger
    return (dispatch)=>{
        axiosI({method:'post',url:'api/student/login',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'STUDENT_LOGIN',
                    payload:response
                });
                console.log('slogin',response.data);
                if(response.data.message==="login successful") {
                    console.log('login', response.data);
                    localStorage.setItem('user', response.data.token);
                    window.location = "/home"
                }
                else{
                    alert('You are not authorized.');
                }
                window.location = "/";
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};

export const scheduleevents=(data)=>{
    return(dispatch)=>{
        axiosI({method:'post',url:'api/event',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'SCHEDULE_EVENT',
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};

export const actionevents=(data)=>{
    return(dispatch)=>{
        debugger;
        axiosI({method:'put',url:'api/event',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'ACTION_ON_EVENT',
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
export const eventslist=()=>{
    return(dispatch)=>{
        axiosI({method:'get',url:'api/event'}).then((response)=>{
            if(response){
                dispatch({
                    type:'EVENT_LIST',
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
