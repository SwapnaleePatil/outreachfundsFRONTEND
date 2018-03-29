import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import MainPage from '../common/mainpage';
import jwt_decode from 'jwt-decode'

const Private = ({...props}) => {
    let access=false;
    let token = localStorage.getItem('user');
    let decoded;
    try {
        if(token === undefined){
            access = false;
        }
        else
        {
            decoded = jwt_decode(token);
        }
    }catch(err){
        console.log(err);
    }
    let currentTime = Math.floor(Date.now()/1000);

    if(decoded === undefined || decoded.exp === undefined){
        localStorage.removeItem('user');
        access = false;
    }
    else
    {
        if (decoded.exp < currentTime) {
            access = false;
            localStorage.removeItem('user');
        }
        else {
            access = true;
        }
    }
    return (access)?<div>
            <MainPage/>  <Route {...props}/></div> :
        <Redirect to="/"/>
};

export default Private;