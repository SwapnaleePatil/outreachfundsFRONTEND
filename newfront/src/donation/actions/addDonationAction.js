import axios from 'axios';

export const addDonationAction=(data)=>{
    return ((dispatch)=>{
        axios.post('http://localhost:3400/addDonation',{data}).then((response)=>{
            dispatch({
                type:'ADD_DONATION',
                payload:response.data
            });
        }).catch((err)=>{console.log(err)})
    });
};