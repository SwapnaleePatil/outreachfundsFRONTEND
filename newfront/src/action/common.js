import axiosI from '../services/axiosInstance';
import {BUSINESS_LOGIN,STUDENT_LOGIN,SCHEDULE_EVENT,ACTION_ON_EVENT,EVENT_LIST,EVENTS_SPONSER,STUDENT_UPDATE,BUSINESS_UPDATE,LOG_OUT} from './actionTypes'
//Action For Business Login
export const  businessLogin=(data)=>{
    const api={
        method:"post",
        url:"api/businessOwner/loginPassport",
        data:data,
    };
    return (dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:BUSINESS_LOGIN,
                payload:response
            });
          }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For Student Login
export const  studentLogin=(data)=>{
    const api={
        method:"post",
        url:"api/student/login",
        data:data,
    };
    return (dispatch)=>{
        axiosI(api).then((response)=>{
            if(response){
                dispatch({
                    type:STUDENT_LOGIN,
                    payload:response
                });
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For Schedule Event
export const scheduleevents=(data)=>{
    const api={
        method:"post",
        url:"api/event",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return(dispatch)=>{
        axiosI(api).then((response)=>{
            if(response){
                dispatch({
                    type:SCHEDULE_EVENT,
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For Accept and Reject Event
export const actionevents=(data)=>{
    const api={
        method:"put",
        url:"api/event",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return(dispatch)=>{
        axiosI(api).then((response)=>{
            if(response){
                dispatch({
                    type:ACTION_ON_EVENT,
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For EventList
export const eventslist=()=>{
    const api={
        method:"get",
        url:"api/event",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return(dispatch)=>{
        debugger
        axiosI(api).then((response)=>{
            if(response){
                dispatch({
                    type:EVENT_LIST,
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For Event Sponser By Business Owner
export const eventslistbysposer=(data)=>{
    const api={
        method:"post",
        url:"api/eventBySponser",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return(dispatch)=>{
        axiosI(api).then((response)=>{
            if(response){
                dispatch({
                    type:EVENTS_SPONSER,
                    payload:response.data.record
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};
export const StudentUpdatePassword = (pswrd, uid) => {
    return (dispatch => {
        axiosI.post('studentUpdatePassword',{'email':uid,'newPassword':pswrd}).then((response) => {
            if (response) {
                dispatch({
                    type: STUDENT_UPDATE,
                    payload: response.data
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    });
}
export const BusinessUpdatePassword = (pswrd, uid) => {
    return (dispatch => {
        axiosI.post('businessUpdatePassword',{'email':uid,'newPassword':pswrd}).then((response) => {
            if (response) {
                dispatch({
                    type: BUSINESS_UPDATE,
                    payload: response.data
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    });
}
export const logoutAction=()=>{
    return(dispatch=>{
        dispatch({
        type:LOG_OUT,
        payload:{'message':'logout'}
        });
    })
};
