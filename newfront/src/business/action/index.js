import axios from 'axios';

export const businessSignup=(page=1)=>{
        return {
        type:'BUSINESS_SIGNUP',
        payload:page
    }
};
export const businessFields=(obj=[])=>{

    return {
        type:'BUSINESS_FIELDS',
        payload:obj
    }
};
export const addBusiness=(obj)=>{
    return (dispatch)=>{
        axios.post("http://localhost:3000/api/business/profile",obj).then((result)=>{
            console.log("Result",result.data.record);
            dispatch({
                type:'BUSINESS_ADD',
                payload:result.data
            })
            localStorage.setItem('user',result.data.record);
        })
    }
};
export const listBusiness=()=>{
    debugger
    return(dispatch)=>{
        axios.get("http://localhost:3000/api/business/profile").then((result)=>{
            dispatch({
                type:'BUSINESS_LIST',
                payload:result.data.record
            });
        }).catch((e)=>{
            console.log(e);
        })
    }
};