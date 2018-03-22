import axiosI from '../services/axiosInstance';
import axios from 'axios';

export const businessLogin = (data) => {
    return (dispatch) => {
        axiosI({method: 'post', url: 'api/businessOwner/loginPassport', data}).then((response) => {
            dispatch({
                type: 'BUSINESS_LOGIN',
                payload: response
            });
            if (response.data.message === "login successful") {
                console.log('login', response.data);
                localStorage.setItem('user', response.data.token);
                window.location = "/home"
            }

        }).catch((e) => {
            console.log(e);
        })
    }
};
export const studentLogin = (data) => {
    return (dispatch) => {
        axiosI({method: 'post', url: 'api/student/login', data}).then((response) => {
            debugger
            if (response) {
                dispatch({
                    type: 'STUDENT_LOGIN',
                    payload: response
                });
                console.log('slogin', response.data);
                if (response.data.message === "login successful") {

                    console.log('login', response.data);
                    localStorage.setItem('user', response.data.token);
                    window.location = "/home"
                }

            }
        }).catch((e) => {
            console.log(e);
        })
    }
};

export const scheduleevents = (data) => {
    return (dispatch) => {
        axiosI({method: 'post', url: 'api/event', data}).then((response) => {
            if (response) {
                dispatch({
                    type: 'SCHEDULE_EVENT',
                    payload: response.data.record
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }
};

export const actionevents = (data) => {
    return (dispatch) => {
        debugger;
        axiosI({method: 'put', url: 'api/event', data}).then((response) => {
            if (response) {
                dispatch({
                    type: 'ACTION_ON_EVENT',
                    payload: response.data.record
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }
};


export const eventslist = () => {
    return (dispatch) => {
        axiosI({method: 'get', url: 'api/event'}).then((response) => {
            if (response) {
                dispatch({
                    type: 'EVENT_LIST',
                    payload: response.data.record
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }
};

export const eventslistbysposer = (data) => {
    return (dispatch) => {
        axiosI({method: 'post', url: '/api/eventBySponser', data}).then((response) => {
            if (response) {
                dispatch({
                    type: 'EVENTS_SPONSER',
                    payload: response.data.record
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }
};
export const updatePassword = (pswrd, uid) => {
    return (dispatch => {
        axios.post('http://localhost:2525/updatePassword', pswrd, uid).then((response) => {
            if (response) {
                dispatch({
                    type: 'UPDATE_PASSWORD',
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
