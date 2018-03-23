// import axios from 'axios';
import axiosI from '../../services/axiosInstance';

export const addDonationAction=(data)=>{
    return ((dispatch)=>{
        axiosI.post('addDonation',data).then((response)=>{
            dispatch({
                type:'ADD_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};
export const getDonationAction=()=>{
    return ((dispatch)=>{
        axiosI({
            method: 'get',
            url: 'getDonationData'
        }).then((response)=>{
            dispatch({
                type:'GET_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};
export const approveDonation=(data)=>{
    return ((dispatch)=>{
        axiosI.patch('approveDonation',data).then((response)=>{
            dispatch({
                type:'EDIT_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};

export const updateDonationAction=(data)=>{
    return ((dispatch)=>{
        axiosI.patch('updateDonation',data).then((response)=>{
            dispatch({
                type:'EDIT_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};

export const getDonationDataAction=()=>{
    return ((dispatch)=>{
        axiosI.get('getDonation').then((response)=>{
            dispatch({
                type:'GET_DONATION',
                payload:response.data
            });
        }).catch((err)=>{
            console.log(err);
        })
    });
};
export const getEventDataAction=()=>{
    return ((dispatch)=>{
        axiosI.get('api/event').then((response)=>{
            dispatch({
                type:'GET_EVENTS',
                payload:response.data.record
            });
        }).catch((err)=>{
            console.log(err);
        })
    });
};

export const FetchByToken=()=>{
    let data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    };
    return ((dispatch)=>{
        axiosI.get('api/business/profile/fetchByToken',data).then((response)=>{
            return (dispatch({
                type:'GET_BUSINESS_BY_TOKEN',
                payload:response.data
            }));
        }).catch((err)=>{
            console.log(err);
        })
    });
};

export const FetchStudent=()=>{
    let data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    };
    return (dispatch=>{
        axiosI.get('api/student',data).then((admin)=>{
            dispatch({
                type:'STUDENT_LOGGED_DATA',
                payload:admin
            });
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    })
};
