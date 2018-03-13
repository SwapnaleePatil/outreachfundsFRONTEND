import axios from 'axios'
export const  studentLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:''}).then((response)=>{
            if(response){
                dispatch({
                    type:'studentlogin',
                    payload:response.data
                })
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
};

export const  businessLogin=(data)=>{
    return (dispatch)=>{
        axios({method:'post',url:''}).then((response)=>{
        if(response){
            dispatch({
                type:'businesslogin',
                payload:response.data
            })
        }
        }).catch((e)=>{
            console.log(e);
        })
    }
};