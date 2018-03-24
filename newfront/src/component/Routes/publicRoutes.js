import React from 'react';
import {Route,Redirect} from 'react-router-dom'

const Public = ({...props}) => {
    return !localStorage.getItem('user')?
        <div><Route {...props}/></div>:
        <Redirect to={'/main'}/>

};
export default Public;