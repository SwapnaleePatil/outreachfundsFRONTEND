import axiosI from '../../services/axiosInstance';
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
        fetch("http://localhost:3000/api/school").then((response)=>{
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
        axiosI.post("http://localhost:3000/api/student/profile",obj).then((student)=>{
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
    debugger;
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
        return fetch('http://localhost:3000/api/student',data).then((response)=>{
            return response.json();
        }).then((admin)=>{
            console.log(admin);
            dispatch(fetchSignupRequests(admin.schoolId));
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
