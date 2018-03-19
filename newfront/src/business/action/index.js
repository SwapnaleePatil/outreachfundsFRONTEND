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
           dispatch({
                type:'BUSINESS_ADD',
                payload:result.data
            })
            localStorage.setItem('user',result.data.record);
        })
    }
};
export const updateBusiness=(obj)=>{
    return (dispatch)=>{
        axios.put("http://localhost:3000/api/business/profile",obj).then((result)=>{
            dispatch({
                type:'BUSINESS_UPDATE',
                payload:result.data
            })
        })
    }
};
export const listBusiness=()=>{
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