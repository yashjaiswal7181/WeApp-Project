import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import auth from '../authenticate';

export default function PrivateRoute({component:Component,...rest}){
    return(
        <Route
        render={(routeProps)=>{
            return localStorage.getItem("loggedUser")?(
                <Component {...routeProps}/>
            ):(<Redirect to="/"/>);
        }}
        {...rest}
        />
    );
}