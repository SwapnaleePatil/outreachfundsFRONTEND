// import axios from 'axios';
import axiosI from '../../services/axiosInstance';

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
    debugger
    return (dispatch)=>{
        axiosI.post('/api/business/profile',obj).then((result)=>{
           dispatch({
                type:'BUSINESS_ADD',
                payload:result.data
            })
            localStorage.setItem('user',result.data.record.tokens[0].token);
            console.log("local",result.data);
            window.location = "/home"
        })
    }
};
export const updateBusiness=(obj)=>{
    return (dispatch)=>{
        axiosI.put('api/business/profile',obj).then((result)=>{
            dispatch({
                type:'BUSINESS_UPDATE',
                payload:result.data
            })
        })
    }
};
export const listBusiness=()=>{

        return(dispatch)=>{

        axiosI.get('api/business/profile').then((result)=>{
            dispatch({
                type:'BUSINESS_LIST',
                payload:result.data.record
            });
        }).catch((e)=>{
            console.log(e);
        })
    }
};