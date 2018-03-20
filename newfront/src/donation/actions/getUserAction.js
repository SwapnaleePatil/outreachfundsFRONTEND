import axios from 'axios';

export const FetchByToken=()=>{
    let data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return ((dispatch)=>{
        axios.get('http://localhost:3000/api/business/profile/fetchByToken',data).then((response)=>{
            return (dispatch({
                type:'GET_BUSINESS_BY_TOKEN',
                payload:response.data
            }));
        }).catch((err)=>{
            console.log(err);
        })
    });
}

export const FetchStudent=()=>{
    let data={
        mode:'cors',
        method:'get',
        headers:{
            'x-auth':localStorage.getItem('user')
        }
    }
    return (dispatch=>{
        return fetch('http://localhost:3000/api/student',data).then((response)=>{
            return response.json();
        }).then((admin)=>{
            dispatch({
                type:'STUDENT_LOGGED_DATA',
                payload:admin
            });
        }).catch((error)=>{
            console.log("Error : ",error);
        })
    })
}
