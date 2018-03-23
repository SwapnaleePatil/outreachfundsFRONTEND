import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import MainPage from '../mainpage';
const Private = ({...props}) => {
    return localStorage.getItem('user')?<div>
            <MainPage/>  <Route {...props}/></div> :
        <Redirect to="/"/>
};
export default Private;