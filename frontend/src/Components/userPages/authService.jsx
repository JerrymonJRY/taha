import { jwtDecode } from 'jwt-decode';
// import jwtDecode   from 'jwt-decode';
//const jwtDecode  = require('jwt-decode');
//import * as jwtDecode  from 'jwt-decode';
import axios from 'axios'
import apiConfig from '../layouts/base_url';

const setToken = (token) => {
       localStorage.setItem('token' ,token);
};


const getToken = ()=> {
   const token = localStorage.getItem('token');
   if(token){
       return token;
   }
   return null;
}



 const login = (userData) => {
    try {
       
        return  axios.post(`${apiConfig.baseURL}/api/user/login`, userData);
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error to let the caller handle it
      }

 }




const getUserEmail = () => {
   const token = getToken();
   if(token){
       const payLoad = jwtDecode (token);
       return payLoad?.email;
   }
   return null;
}

const getUserRole = () => {
   const token = getToken();
   if(token){
       const payLoad = jwtDecode (token);
       return payLoad?.role;
   }
   return null;
}

const isLoggedIn = () => {
   const token = getToken();
   if(token){
       const payLoad = jwtDecode (token);
       const isLogin = Date.now() < payLoad.exp * 1000;
       return isLogin;

   }
}

const logOut = ()=> {
   localStorage.clear();
}


export  const authService = { logOut, getToken, setToken,  getUserEmail, getUserRole, isLoggedIn};