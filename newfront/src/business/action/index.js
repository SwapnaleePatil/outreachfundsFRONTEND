import axiosI from '../../services/axiosInstance';
//Action for Paging in to Wizard Form
export const businessPage = (page = 1) => {
    return {
        type: 'BUSINESS_SIGNUP',
        payload: page
    }
};
//Action For Maintaining data in to Wizard Form
export const businessFields = (obj = []) => {

    return {
        type: 'BUSINESS_FIELDS',
        payload: obj
    }
};
//Action For Adding New Record
export const addBusiness = (obj) => {
    return (dispatch) => {
        axiosI.post('api/business/profile', obj).then((result) => {
            dispatch({
                type: 'BUSINESS_ADD',
                payload: result.data
            })
        })
    }
};
//Action For Update the record
export const updateBusiness = (obj) => {
    let header = {
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    }
    return (dispatch) => {
        axiosI.put('api/business/profile',header, obj).then((result) => {
            dispatch({
                type: 'BUSINESS_UPDATE',
                payload: result.data
            })
        })
    }
};
//Action For Getting List of business
export const listBusiness = () => {
    let header = {
        headers: {
            'x-auth': localStorage.getItem('user')
        }
    }
    return (dispatch) => {
        axiosI.get('api/business/profile', header).then((result) => {
            if (result) {
                dispatch({
                    type: 'BUSINESS_LIST',
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
    let data={
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch)=>{
        axiosI.get('api/business/profile/fetchByToken',data).then((user)=>{
            debugger
            dispatch({
                type:'FETCH_BUSINESS',
                payload:user.data.User
            })
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    }
}