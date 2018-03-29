import axiosI from '../services/axiosInstance';
import {STUDENT_LOGGED_DATA,GET_BUSINESS_BY_TOKEN,GET_EVENTS,EDIT_DONATION,GET_DONATION,ADD_DONATION}  from './actionTypes'
export const addDonationAction=(data)=>{
    const api={
        method:"post",
        url:"addDonation",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:ADD_DONATION,
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};
export const getDonationAction=()=>{

    const api={
        method:"get",
        url:"getDonationData",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:GET_DONATION,
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};
export const approveDonation=(data)=>{
    const api={
        method:"patch",
        url:"approveDonation",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:EDIT_DONATION,
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};

export const updateDonationAction=(data)=>{
    const api={
        method:"patch",
        url:"updateDonation",
        data:data,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:EDIT_DONATION,
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};

export const getEventDataAction=()=>{
    const api={
        method:"patch",
        url:"api/event",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI(api).then((response)=>{
            dispatch({
                type:GET_EVENTS,
                payload:response.data.record
            });
        }).catch((err)=>{
            console.log(err);
        })
    });
};

export const FetchByToken=()=>{
    const api={
        method:"get",
        url:"api/business/profile/fetchByToken",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };

    return ((dispatch)=>{
        axiosI.get(api).then((response)=>{
            return (dispatch({
                type:GET_BUSINESS_BY_TOKEN,
                payload:response.data
            }));
        }).catch((err)=>{
            console.log(err);
        })
    });
};

export const FetchStudent=()=>{
    const api={
        method:"get",
        url:"api/student",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch=>{
        axiosI(api).then((admin)=>{
            dispatch({
                type:STUDENT_LOGGED_DATA,
                payload:admin
            });
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    })
};
