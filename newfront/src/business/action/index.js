import axiosI from '../../services/axiosInstance';
//Action for Paging in to Wizard Form
export const businessPage=(page=1)=>{
        return {
        type:'BUSINESS_SIGNUP',
        payload:page
    }
};
//Action For Maintaining data in to Wizard Form
export const businessFields=(obj=[])=>{

    return {
        type:'BUSINESS_FIELDS',
        payload:obj
    }
};
//Action For Adding New Record
export const addBusiness=(obj)=>{
    return (dispatch)=>{
        axiosI.post('api/business/profile',obj).then((result)=>{
           dispatch({
                type:'BUSINESS_ADD',
                payload:result.data
            })
            localStorage.setItem('user',result.data.record.tokens[0].token);
            window.location = "/home"
        })
    }
};
//Action For Update the record
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
//Action For Getting List of business
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