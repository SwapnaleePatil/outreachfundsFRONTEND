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
        fetch(`http://localhost:3000/api/school`).then((response)=>{
            return response.json();
        }).then((schools)=>{
            console.log("School",schools);
            dispatch({
                type:'FETCH_SCHOOLS',
                payload:schools
            })
        }).catch = (error) =>{
            console.log(error)
        }
    }
}

export const registerStudent = (obj) => {
debugger;
    return (dispatch)=>{
        axiosI.post("/api/student/profile",obj).then((student)=>{
            debugger;
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
        axiosI.post("http://localhost:3000/api/school",schoolObj).then((school)=>{
            debugger;
            personalObj.append('schoolId',school.data.school._id)
            dispatch(registerStudent(personalObj));
            debugger;
            dispatch({
                type:'REGISTER_SCHOOL',
                payload:school
            });

        }).catch = (error) =>{
            console.log("Error in Registeration of School..",error)
        }
    }
}
export const fetchStudent=()=>{
    var data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch=>{
        return fetch(`/api/student`,data).then((response)=>{
            return response.json();
        }).then((user)=>{
            if(user.roleTitle==='Admin')
                dispatch(fetchSignupRequests(user.schoolId));
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    })
}
export const fetchSignupRequests = (schoolId) => {
    return (dispatch)=>{
        return fetch(`http://localhost:3000/api/students/${schoolId}`).then((response)=>{
            return response.json();
        }).then((requests)=>{
            dispatch({
                type:'FETCH_REGISTER_REQUEST',
                payload:requests
            })
        }).catch = (error) =>{
            console.log("Error in Fetching of Requests..",error)
        }
    }
}
export const approveSignupRequests = (resultSet) => {
    let arr=[...resultSet];
    var obj={
        "arr":arr
    }
    var url=`/api/student/approve`;
    var data={
        method:'post',
        mode:'cors',
        body:JSON.stringify(obj),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch)=>{
        return fetch(url,data).then((response)=>{
            return response.json();
        }).then(()=>{
            debugger;
            dispatch({
                type:'APPROVE_REQUEST',
                payload:arr
            })
        }).catch = (error) =>{
            console.log("Error in Fetching of Requests..",error)
        }
    }
}
export const rejectSignupRequests = (resultSet) => {
    let arr=[...resultSet];
    var obj={
        "arr":arr
    }
    var url=`/api/student/reject`;
    var data={
        method:'post',
        mode:'cors',
        body:JSON.stringify(obj),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return (dispatch)=>{
        return fetch(url,data).then((response)=>{
            return response.json();
        }).then(()=>{
            debugger;
            dispatch({
                type:'REJECT_REQUEST',
                payload:arr
            })
        }).catch = (error) =>{
            console.log("Error in Rejecting Requests..",error)
        }
    }
}
