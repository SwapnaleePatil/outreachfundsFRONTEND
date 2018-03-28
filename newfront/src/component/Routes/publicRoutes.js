import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
const Public = ({...props}) => {
    let token = localStorage.getItem('user');
    let decoded;
    try {
        decoded = jwt_decode(token);
    }catch(err){
        console.log(err);
    }
    console.log(decoded);
    if(decoded===undefined){
        localStorage.removeItem('user');
    }
    return !localStorage.getItem('user')?
        <div><Route {...props}/></div>:
        <Redirect to={'/main'}/>
};
export default Public;