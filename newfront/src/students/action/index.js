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
    console.log("formdata",obj);
    var data={
        mode:'cors',
        body:obj,
        method:'post'
    }
    return (dispatch)=>{
        return fetch("http://localhost:3000/api/student/profile",data).then((response)=>{
            debugger;
            console.log(response);
            //return response.json();
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
};

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
        return fetch("http://localhost:3000/api/school",data).then((response)=>{
            return response.json();
        }).then((school)=>{
            personalObj.append('schoolId',school.school._id)
            //personalObj.schoolId=school.school._id;
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
};


