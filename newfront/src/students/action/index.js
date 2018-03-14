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
        debugger;
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

