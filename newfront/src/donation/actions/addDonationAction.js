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
export const getDonationAction=()=>{
    return ((dispatch)=>{
        axios({
            method: 'get',
            url: 'http://localhost:3000/getDonationData'
        }).then((response)=>{
            dispatch({
                type:'GET_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
}
export const approveDonation=(data)=>{
    console.log(data)
    return ((dispatch)=>{
        axios.patch('http://localhost:3000/approveDonation',data).then((response)=>{
            dispatch({
                type:'EDIT_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};

export const updateDonationAction=(data)=>{
    return ((dispatch)=>{
        axios.patch('http://localhost:3000/updateDonation',data).then((response)=>{
            dispatch({
                type:'EDIT_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)});
    });
};