let myport=4000;
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
        fetch(`http://localhost:${myport}/api/school`).then((response)=>{
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
    var data={
        mode:'cors',
        body:obj,
        method:'post'
    }
    return (dispatch)=>{
        return fetch(`http://localhost:4000/api/student/profile`,data).then((response)=>{
            debugger;
            return response;
        }).then((student)=>{
            debugger;
            dispatch({
                type:'REGISTER_STUDENT',
                payload:student
            })
        }).catch = (error) =>{
            console.log("Error in Registeration of Student..",error)
        }
    }
}

export const registerSchool = (schoolObj,personalObj) => {
    debugger;
    console.log("in school",schoolObj);
    var data={
        mode:'cors',
        body:JSON.stringify(schoolObj),
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    }
    return (dispatch)=>{
        return fetch(`http://localhost:${myport}/api/school`,data).then((response)=>{
            return response.json();
        }).then((school)=>{
            personalObj.append('schoolId',school.school._id)
            debugger;
            dispatch(registerStudent(personalObj));
            debugger;
            dispatch({
                type:'REGISTER_SCHOOL',
                payload:school
            })
        }).catch = (error) =>{
            console.log("Error in Registeration of School..",error)
        }
    }
}
export const fetchStudent=()=>{
    debugger;
    var data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch=>{
        return fetch(`http://localhost:${myport}/api/student`,data).then((response)=>{
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
        return fetch(`http://localhost:${myport}/api/students/${schoolId}`).then((response)=>{
            return response.json();
        }).then((requests)=>{
            debugger;
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
    var url=`http://localhost:${myport}/api/student/approve`;
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
    var url=`http://localhost:${myport}/api/student/reject`;
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

