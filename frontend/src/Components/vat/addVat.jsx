import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const AddVat =() =>{

    const [values,setValues] = useState({

        vatname :'',
        percentage:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validateForm(values);
    
      if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/vat/createvat`, values)
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'VAT Created!',
              text: 'Your Vat has been created successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).then(() => {
              navigate('/viewVat');
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
  
      if (!data.vatname) {
        errors.vatname = "Vat Name is required";
      }

      if (!data.percentage) {
        errors.percentage = "Vat Percentage is required";
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
              <h3 className="page-title"> Add Vat </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Vat</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Vat Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="vatname" id="exampleInputUsername2" onChange={e =>setValues({...values, vatname: e.target.value})} placeholder="Vat Name" />
                          {errors.vatname && <span className="error">{errors.vatname}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Percentage</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="percentage" id="exampleInputUsername2" onChange={e =>setValues({...values, percentage: e.target.value})} placeholder="Percentage" />
                          {errors.percentage && <span className="error">{errors.percentage}</span>}
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

export default AddVat;