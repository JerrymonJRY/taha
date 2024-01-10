import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const AddDelivery =() =>{

    const [values,setValues] = useState({

        dliveryname :'',
        deliverymobile:'',
      
      

       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validateForm(values);
      console.log(values);
      if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/delivery/createdelivery`, values)
       
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Delivery Person Created!',
              text: 'Your Delivery Person has been created successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).then(() => {
              navigate('/viewDelivery');
            });
          })
          .catch((err) => console.log(err));
      } else {
        // Set validation errors
        setErrors(validationErrors);
      }
    };


    const validateForm = (data) => {
      let errors = {};
  
      if (!data.dliveryname) {
        errors.dliveryname = "Delivery Name is required";
      }

    
      if (!data.deliverymobile) {
        errors.deliverymobile = "Mobile Number is required";
      } else if (!/^\d+$/.test(data.deliverymobile)) {
        errors.deliverymobile = "Only numbers are allowed in the mobile number field";
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
              <h3 className="page-title"> Add Delivery </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Delivery</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="dliveryname" id="exampleInputUsername2" onChange={e =>setValues({...values, dliveryname: e.target.value})} placeholder="Delivery Name" />
                          {errors.dliveryname && <span className="error">{errors.dliveryname}</span>}
                        </div>
                      </div>
                   
                    

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Mobile Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="deliverymobile" id="exampleInputUsername2" onChange={e =>setValues({...values, deliverymobile: e.target.value})} placeholder="Mobile Number" />
                          {errors.deliverymobile && <span className="error">{errors.deliverymobile}</span>}
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

export default AddDelivery;