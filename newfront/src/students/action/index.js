import axiosI from '../../services/axiosInstance'
export const signupPageAction=(page=1)=>{
    return {
        type:"CHANGE_SIGNUP_PAGE",
        payload:page
    }
}
export const setSignupPageFieldsAction=(obj=[])=>{
    return {
        type:"SIGNUP_PAGE_FIELDS",
        payload:obj
    }
}


export const fetchAllSchoolDetails = () => {
    return (dispatch)=>{
        axiosI.get(`api/school`).then((schools)=>{
            console.log("School",schools);
            dispatch({
                type:'FETCH_SCHOOLS',
                payload:schools.data
            })
        }).catch = (error) =>{
            console.log(error)
        }
    }
}

export const registerStudent = (obj) => {
    return (dispatch)=>{
        axiosI.post("api/student/profile",obj).then((student)=>{
            dispatch({
                type:'REGISTER_STUDENT',
                payload:student.data
            })
            window.location = "/"

        }).catch = (error) =>{
            console.log("Error in Registeration of Student..",error)
        }
    }
};

export const registerSchool = (schoolObj,personalObj) => {
    console.log("in school",schoolObj);
    return (dispatch)=>{
        axiosI.post("api/school",schoolObj).then((school)=>{
            personalObj.append('schoolId',school.data.school._id)
            dispatch(registerStudent(personalObj));
            dispatch({
                type:'REGISTER_SCHOOL',
                payload:school.data
            });
        }).catch = (error) =>{
            console.log("Error in Registeration of School..",error)
        }
    }
}
export const fetchAdmin=()=>{
    let data={
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch=>{
        axiosI.get(`api/student`,data).then((user)=>{
            if(user.data.roleTitle==='Admin')
                dispatch(fetchSignupRequests(user.data.schoolId));
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    })
}
export const fetchStudent=()=>{
    let data={
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch)=>{
        axiosI.get(`api/student`,data).then((user)=>{
            dispatch({
                type:'FETCH_STUDENT',
                payload:user.data
            })
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    }
}
export const fetchSignupRequests = (schoolId) => {
    return (dispatch)=>{
        axiosI.get(`api/students/${schoolId}`).then((requests)=>{
            dispatch({
                type:'FETCH_REGISTER_REQUEST',
                payload:requests.data
            })
        }).catch = (error) =>{
            console.log("Error in Fetching of Requests..",error)
        }
    }
}
export const FetchAllStudents = () => {
    let data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch)=>{
        return axiosI.get(`api/students`,data).then((response)=>{
            dispatch({
                type:'FETCH_STUDENT',
                payload:response.data
            })
        }).catch = (error) =>{
            console.log("Error in Fetching of Requests..",error)
        }
    }
}
export const approveSignupRequests = (resultSet) => {
    console.log(resultSet);
    let arr=[...resultSet];
    let obj={
        "arr":arr
    }
    let url=`api/student/approve`;

        return (dispatch) => {
            axiosI.post(url, obj).then(() => {
                dispatch({
                    type: 'APPROVE_REQUEST',
                    payload: arr
                })
            }).catch = (error) => {
                console.log("Error in Fetching of Requests..", error)
            }
    }
}
export const rejectSignupRequests = (resultSet) => {
    let arr=[...resultSet];
    let obj={
        "arr":arr
    }
    let url=`api/student/reject`;

        return (dispatch) => {
            axiosI.post(url, obj).then(() => {
                debugger;
                dispatch({
                    type: 'REJECT_REQUEST',
                    payload: arr
                })
            }).catch = (error) => {
                console.log("Error in Rejecting Requests..", error)
            }
        }
}
export const updateStudent=(obj)=>{
    debugger
    return (dispatch)=>{
        axiosI.put('api/student/profile',obj).then((result)=>{
            console.log("Result",result.data.record);
            dispatch({
                type:'STUDENT_UPDATE',
                payload:result.data.record
            })
        })
    }
};
export const updateSchool=(obj)=>{
    debugger
    return (dispatch)=>{
        axiosI.put('api/school',obj).then((result)=>{

            dispatch({
                type:'SCHOOL_UPDATE',
                payload:result.data.record
            })
        })
    }
};