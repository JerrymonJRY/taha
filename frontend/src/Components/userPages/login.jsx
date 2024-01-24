import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
import { setToken,setfirstNames,setlastNames,setUserId,setShiftToken,setUserRole,setUserAccess } from '../routes/PrivateRoutes';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Show loading state
    setLoading(true);

    try {
      const response = await axios.post(`${apiConfig.baseURL}/api/user/login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        const data = response.data;
    
        setToken(data.token);
        setfirstNames(data.firstname);
        setlastNames(data.lastname);
        setUserId(data._id);
        setShiftToken(data.shifttoken);
        setUserRole(data.userrole);
        setUserAccess(data.shiftacess)

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred during login',
      });
    } finally {
      // Hide loading state after login process is complete
      setLoading(false);
    }
  };

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
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="submit"
                      onClick={handleLogin}
                      className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                      value={loading ? 'Signing in...' : 'Sign in'}
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
                    <a href="#" className="auth-link text-black">
                      Forgot password?
                    </a>
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