import {BUSINESS_SIGNUP,BUSINESS_ADD,BUSINESS_FIELDS,BUSINESS_UPDATE,BUSINESS_LIST,FETCH_BUSINESS} from  './actionTypes';
import axiosI from '../services/axiosInstance';
//Action for Paging in to Wizard Form
export const businessPage = (page = 1) => {
    return {
        type: BUSINESS_SIGNUP,
        payload: page
    }
};
//Action For Maintaining data in to Wizard Form
export const businessFields = (obj = []) => {

    return {
        type: BUSINESS_FIELDS,
        payload: obj
    }
};
//Action For Adding New Record
export const addBusiness = (obj) => {
    const api={
        method:"post",
        url:"api/business/profile",
        obj:obj,
    };
    return (dispatch) => {
        axiosI(api).then((result) => {
            dispatch({
                type: BUSINESS_ADD,
                payload: result.data
            })
        })
    }
};
//Action For Update the record
export const updateBusiness = (obj) => {
    const api={
        method:"put",
        url:"api/business/profile",
        obj:obj,
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((result) => {
            debugger
            dispatch({
                type: BUSINESS_UPDATE,
                payload: result.data
            })
        }).catch((error)=>{
            debugger
        })
    }
};
//Action For Getting List of business
export const listBusiness = () => {
    const api={
        method:"get",
        url:"api/business/profile",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch) => {
        axiosI(api).then((result) => {
            if (result) {
                dispatch({
                    type: BUSINESS_LIST,
                    payload: result.data.record
                });

            }
        }).catch((e) => {
            console.log(e);
        })
    }
};
//Fetch By Token
export const fetchBusiness=()=>{
    debugger
    const api={
        method:"get",
        url:"api/business/profile/fetchByToken",
        headers:{
            'x-auth': localStorage.getItem('user')
        }
    };
    return (dispatch)=>{
        axiosI(api).then((user)=>{
            debugger
            dispatch({
                type: FETCH_BUSINESS,
                payload:user.data.User
            })
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    }
}