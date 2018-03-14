export const signupPageAction=(pg=1)=>{
    console.log("action",pg);
    return {
        type:"CHANGE_SIGNUP_PAGE",
        payload:pg
    }
}
export const setSignupPageFieldsAction=(obj=[])=>{
    return {
        type:"SIGNUP_PAGE_FIELDS",
        payload:obj
    }
}