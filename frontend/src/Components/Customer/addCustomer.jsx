import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const AddCustomer =() =>{

    const [values,setValues] = useState({

        customername :'',
        customeremail:'',
        customermobile:'',
        customeraddress:''
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/customer/createCustomer`,values)
        .then(res =>{

            console.log(res);
            navigate('/viewCustomer');
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
  
      if (!data.customername) {
        errors.customername = "Customer Name is required";
      }

      if (!data.customeremail) {
        errors.customeremail = "Vat Percentage is required";
      }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.customeremail)) {
        errors.customeremail = "Invalid email address";
      }
      if (!data.customermobile) {
        errors.customermobile = "Mobile Number is required";
      } else if (!/^\d+$/.test(data.customermobile)) {
        errors.customermobile = "Enter Number Only";
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
              <h3 className="page-title"> Add Customer </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Customer</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customername" id="exampleInputUsername2" onChange={e =>setValues({...values, customername: e.target.value})} placeholder="Customer Name" />
                          {errors.customername && <span className="error">{errors.customername}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customeremail" id="exampleInputUsername2" onChange={e =>setValues({...values, customeremail: e.target.value})} placeholder="Customer Email" />
                          {errors.customeremail && <span className="error">{errors.customeremail}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Mobile</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customermobile" id="exampleInputUsername2" onChange={e =>setValues({...values, customermobile: e.target.value})} placeholder="Customer Mobile" />
                          {errors.customermobile && <span className="error">{errors.customermobile}</span>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Address</label>
                        <div className="col-sm-9">
                         <textarea className='form-control' name='customeraddress' onChange={e =>setValues({...values, customeraddress: e.target.value})}></textarea>
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

export default AddCustomer;