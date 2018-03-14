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
        fetch("http://localhost:4000/api/school").then((response)=>{
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
    console.log("formdata",obj);
    var data={
        mode:'cors',
        body:obj,
        method:'post'
    }
    return (dispatch)=>{
        return fetch("http://localhost:4000/api/student/profile",data).then((response)=>{
            console.log("Response - ",response);
            return response.json();
        }).then((response)=>{
            console.log("response",response);
            dispatch({
                type:'REGISTER_STUDENT',
                payload:response
            })
        }).catch = (error) =>{
            console.log(error)
        }
    }
}

