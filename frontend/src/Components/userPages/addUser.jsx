import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const AddUser =() =>{

    const [values,setValues] = useState({

        firstname :'',
        lastname:'',
        email:'',
        mobile:'',
        password:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/user/register`,values)
        .then(res =>{

            console.log(res);
            navigate('/viewuser');
        })
        .catch(err =>console.log(err));
      }
      else {
        // Set validation errors
        setErrors(validationErrors);
      }


    }

    const validateForm = (data) => {
      let errors = {};
  
      if (!data.firstname) {
        errors.firstname = "First Name is required";
      }
      
      if (!data.lastname) {
        errors.lastname = "Last Name is required";
      }
      
      if (!data.email) {
        errors.email = "Email is required";
      }
      
      if (!data.mobile) {
        errors.mobile = "Mobile Number is required";
      }

      if (!data.password) {
        errors.password = "Password is required";
      }
  
  
     
      return errors;
    };

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Add User </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add User</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit} >
                        <div className="row">
                          
                            <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="firstname" id="exampleInputUsername2" onChange={e =>setValues({...values, firstname: e.target.value})} placeholder="" />
                          {errors.firstname && <span className="error">{errors.firstname}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="lastname" id="exampleInputUsername2" onChange={e =>setValues({...values, lastname: e.target.value})} placeholder="" />
                          {errors.lastname && <span className="error">{errors.lastname}</span>}
                        </div>
                      </div>


                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="email" id="exampleInputUsername2" onChange={e =>setValues({...values, email: e.target.value})} placeholder="" />
                          {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="mobile" id="exampleInputUsername2" onChange={e =>setValues({...values, mobile: e.target.value})} placeholder="" />
                          {errors.mobile && <span className="error">{errors.mobile}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="password" id="exampleInputUsername2" onChange={e =>setValues({...values, password: e.target.value})} placeholder="" />
                          {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                      </div>




                    
                    
                           
                      
                        </div>
                   
                      <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                     
                    </form>
                  </div>
                </div>
              </div>
 
   

      
            </div>
          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default AddUser;