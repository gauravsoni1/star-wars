import React from 'react';
import {Route,Redirect} from "react-router-dom";

const isAuthenticated = () =>{
    if(localStorage.getItem("token") !== null){
        return true;
    }else{
        return false;
    }
}

const PrivateRoute = (props) =>{

    const authStatus = isAuthenticated();    

    return(
        <>
        {authStatus?<Route {...props} />:<Redirect from="/" to="login"/>}
        </>
    )
}

export default PrivateRoute;