// import axios from 'axios';
import axiosI from '../../services/axiosInstance';

export const addDonationAction=(data)=>{
    return ((dispatch)=>{
        axiosI.post('addDonation',{data}).then((response)=>{
            dispatch({
                type:'ADD_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};