// import axios from 'axios';
import axiosI from '../../services/axiosInstance';

export const getDonationDataAction=()=>{
    return ((dispatch)=>{
        axiosI.get('getDonation').then((response)=>{
            dispatch({
                type:'GET_DONATION',
                payload:response.data
            });
        }).catch((err)=>{
            console.log(err);
        })
    });
};