import axiosI from '../services/axiosInstance';
//Action For Business Login
export const  businessLogin=(data)=>{
    return (dispatch)=>{
        axiosI({method:'post',url:'api/businessOwner/loginPassport',data}).then((response)=>{
            dispatch({
                type:'BUSINESS_LOGIN',
                payload:response
            });
          }).catch((e)=>{
            console.log(e);
        })
    }
};
//Action For Student Login
export const  studentLogin=(data)=>{
    return (dispatch)=>{
        axiosI({method:'post',url:'api/student/login',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'STUDENT_LOGIN',
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
//Action For Accept and Reject Event
export const actionevents=(data)=>{
    return(dispatch)=>{
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
//Action For EventList
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
//Action For Event Sponser By Business Owner
export const eventslistbysposer=(data)=>{
    return(dispatch)=>{
        axiosI({method:'post',url:'/api/eventBySponser',data}).then((response)=>{
            if(response){
                dispatch({
                    type:'EVENTS_SPONSER',
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
                    type: 'STUDENT_UPDATE',
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
                    type: 'BUSINESS_UPDATE',
                    payload: response.data
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    });
}
/*export const FetchIdByEmail = (email,newPassword) => {

    axios.post('http://localhost:2525/findByEmail', {'email':email,'newPassword':newPassword}).then((response) => {

    })
}
export const UpdatePassword = (id, pswrd) => {
    return (dispatch => {
        axios.post('http://localhost:2525/updatePassword', id, pswrd).then((response) => {
            if (response) {
                dispatch({
                    type: 'UPDATE_PASSWORD',
                    payload: response.data
                });
            }
        })
    })
};*/
