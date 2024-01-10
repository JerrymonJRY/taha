import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import { setToken,setfirstNames,setlastNames,setUserId,setShiftToken } from '../routes/PrivateRoutes';
function  Login() {

  const [email,setEmail]=useState()
  const [password,setPassword] =useState()
  const [authToken, setAuthToken] = useState('');
  const navigate = useNavigate();



  //const navigate = redirect();
 
  const handleLogin = (e) => {


    e.preventDefault();
   
   axios.post(`${apiConfig.baseURL}/api/user/login`, { email, password })
    
    .then((response) => {

      if (response.data) {
     
            const data = response.data;
            if (data && data.token) {
              console.log(data.token);
              setAuthToken(data.token);
              setToken(data.token);
               navigate('/dashboard');
               setfirstNames(data.firstname);
               setlastNames(data.lastname);
               setUserId(data._id);
               setShiftToken(data.shifttoken);
             } else {
        
               }
              }
    

  })

   
  };

  console.log();




 // const [email setEmail]

    return(
        <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo text-center">
                    <img src="assets/images/pos/burps.png" />
                  </div>
                 
                  <form className="pt-3" >
                    <div className="form-group">

                      <input name="email" onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" autocomplete="username" />
                   
                    </div>
                    <div className="form-group">
                    <input type="password" name="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} autocomplete="current-password" />
                    
                    
                    </div>
                    <div className="mt-3">
                      <input type='submit' onClick={handleLogin} className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn" value="Sign in" />
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" /> Keep me signed in </label>
                      </div>
                      <a href="#" className="auth-link text-black">Forgot password?</a>
                    </div>
                  
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      
      </div>
    );

}

export default Login;