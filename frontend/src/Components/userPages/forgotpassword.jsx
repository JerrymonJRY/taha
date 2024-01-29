import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';

function Forgotpassword() {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotpassword = async (e) => {

    e.preventDefault();

    setLoading(true);
    try
    {
        const response = await axios.post(`${apiConfig.baseURL}/api/user/forgotpassword`, {
            email,
           
          });
    }
    catch(error)
    {
        console.error('Login error:', error);
    }

  }



  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo text-center">
                  <img src="assets/images/pos/burps.png" alt="Logo" />
                </div>

                <form className="pt-3">
                  <div className="form-group">
                    <input
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </div>
                  
                  <div className="mt-3">
                    <input
                      type="submit"
                      onClick={handleForgotpassword}
                      className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                      value={loading ? 'Forgot Password...' : 'Forgot Password'}
                      disabled={loading}
                    />
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input
                          type="checkbox"
                          className="form-check-input"
                        />{' '}
                        Keep me signed in
                      </label>
                    </div>
                  
                    <Link className="auth-link text-black" to="/"> Login </Link>
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

export default Forgotpassword;