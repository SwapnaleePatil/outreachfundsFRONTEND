import axios from 'axios';

export const getDonationDataAction=()=>{
    return ((dispatch)=>{
        axios.get('http://localhost:3400/getDonation').then((response)=>{
            dispatch({
                type:'GET_DONATION',
                payload:response.data
            });
        }).catch((err)=>{
            console.log(err);
        })
    });
}