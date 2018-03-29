import axiosI from '../services/axiosInstance'
import {SCHOOL_UPDATE,CHANGE_SIGNUP_PAGE,STUDENT_UPDATE,SIGNUP_PAGE_FIELDS,REJECT_REQUEST,FETCH_SCHOOLS,REGISTER_STUDENT,REGISTER_SCHOOL,APPROVE_REQUEST,FETCH_STUDENT,FETCH_REGISTER_REQUEST} from './actionTypes';
export const signupPageAction = (page = 1) => {
    return {
        type: CHANGE_SIGNUP_PAGE,
        payload: page
    }
}
export const setSignupPageFieldsAction = (obj = []) => {
    return {
        type: SIGNUP_PAGE_FIELDS,
        payload: obj
    }
}
export const fetchAllSchoolDetails = () => {
    const api = {
        method: "get",
        url: "api/school",
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((schools) => {
            dispatch({
                type: FETCH_SCHOOLS,
                payload: schools.data
            })
        }).catch = (error) => {
            console.log(error)
        }
    }
}

export const registerStudent = (obj) => {
    const api = {
        method: "post",
        url: "api/student/profile",
        obj: obj,
    };
    return (dispatch) => {
        axiosI(api).then((student) => {
            dispatch({
                type: REGISTER_STUDENT,
                payload: student.data
            })
        }).catch = (error) => {
            console.log("Error in Registeration of Student..", error)
        }
    }
};

export const registerSchool = (schoolObj, personalObj) => {
    const api = {
        method: "post",
        url: "api/student/profile",
        schoolObj: schoolObj,
    };
    return (dispatch) => {
        axiosI(api).then((school) => {
            personalObj.append('schoolId', school.data.school._id)
            dispatch(registerStudent(personalObj));
            dispatch({
                type: REGISTER_SCHOOL,
                payload: school.data
            });
        }).catch = (error) => {
            console.log("Error in Registeration of School..", error)
        }
    }
}
export const fetchAdmin = () => {
    const api = {
        method: "get",
        url: "api/student",
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };

    return (dispatch => {
        axiosI(api).then((user) => {
            if (user.data.roleTitle === 'Admin')
                dispatch(fetchSignupRequests(user.data.schoolId));
        }).catch((error) => {
            console.log("Error : ", error);
        })
    })
}
export const fetchStudent = () => {
    const api = {
        method: "get",
        url: "api/student",
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((user) => {
            dispatch({
                type: FETCH_STUDENT,
                payload: user.data
            })
        }).catch((error) => {
            console.log("Error : ", error);
        })
    }
}
export const fetchSignupRequests = (schoolId) => {
    const api = {
        method: "get",
        url: `api/student/${schoolId}`,
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((requests) => {
            dispatch({
                type: FETCH_REGISTER_REQUEST,
                payload: requests.data
            })
        }).catch = (error) => {
            console.log("Error in Fetching of Requests..", error)
        }
    }
}
export const FetchAllStudents = () => {
    const api = {
        method: "get",
        url: "api/student",
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        return axiosI(api).then((response) => {
            dispatch({
                type: FETCH_STUDENT,
                payload: response.data
            })
        }).catch = (error) => {
            console.log("Error in Fetching of Requests..", error)
        }
    }
}
export const approveSignupRequests = (resultSet) => {
    let arr = [...resultSet];
    const api = {
        method: "post",
        url: `api/student/approve`,
        arr: arr,
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then(() => {
            dispatch({
                type: APPROVE_REQUEST,
                payload: arr
            })
        }).catch = (error) => {
            console.log("Error in Fetching of Requests..", error)
        }
    }
};
export const rejectSignupRequests = (resultSet) => {
    let arr = [...resultSet];
    const api = {
        method: "post",
        url: `api/student/reject`,
        arr: arr,
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then(() => {
            dispatch({
                type: REJECT_REQUEST,
                payload: arr
            })
        }).catch = (error) => {
            console.log("Error in Rejecting Requests..", error)
        }
    }
}
export const updateStudent = (obj) => {
    const api = {
        method: "put",
        url: "api/student/profile",
        obj: obj,
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((result) => {
            dispatch({
                type: STUDENT_UPDATE,
                payload: result.data.record
            })
        })
    }
};
export const updateSchool = (obj) => {
    const api = {
        method: "put",
        url: "api/school",
        obj: obj,
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((result) => {

            dispatch({
                type: SCHOOL_UPDATE,
                payload: result.data.record
            })
        })
    }
};