import React, { } from "react";
  
import {
    Navigate ,
    useLocation
  } from "react-router-dom";
export const setToken = (token) =>{
    // set token in localStorage
    localStorage.setItem('token', token)
}
export const fetchToken = (token) =>{
    // fetch the token
    return localStorage.getItem('token')
}
export function RequireToken({children}) {
      
    let auth = fetchToken()
    let location = useLocation();
    
    if (!auth) {
        
      return <Navigate to="/" state={{ from: location }} />;
    }
    
    return children;
}

export const setlastNames = (lastname) =>{
  // set token in localStorage
  localStorage.setItem('lastname', lastname)
}

export const setfirstNames = (firstname) =>{
  // set token in localStorage
  localStorage.setItem('firstname', firstname)
}

export const setUserId = (_id) =>{
  // set token in localStorage
  localStorage.setItem('_id', _id)
}

export const setShiftToken = (shifttoken) =>{
  // set token in localStorage
  localStorage.setItem('shifttoken', shifttoken)
}

export const setUserRole = (userrole) =>{
  // set token in localStorage
  localStorage.setItem('userrole', userrole)
}

export const setUserAccess = (shiftacess) =>{
  // set token in localStorage
  localStorage.setItem('shiftacess', shiftacess)
}
