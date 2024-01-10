import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const AddSupplier =() =>
{
    const [values,setValues] = useState({

        suppliername :'',
        supplieremail:'',
        suppliermobile:'',
        taxnumber:'',
        licensenumber:'',
        supplieraddress:'',
        

       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validateForm(values);
    
      if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/supplier/createsupplier`, values)
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Supplier Created!',
              text: 'Your Supplier has been created successfully.',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).then(() => {
              navigate('/viewSupplier');
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
  
      if (!data.suppliername) {
        errors.suppliername = "Supplier Name is required";
      }

      if (!data.supplieremail) {
        errors.supplieremail = "Email is required";
      }

      if (!data.suppliermobile) {
        errors.suppliermobile = "Mobile Number is required";
      } else if (!/^\d+$/.test(data.suppliermobile)) {
        errors.mobile = "Only numbers are allowed in the mobile number field";
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
              <h3 className="page-title"> Add Supplier </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Inventory</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Supplier</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Supplier Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="suppliername" id="exampleInputUsername2" onChange={e =>setValues({...values, suppliername: e.target.value})} placeholder="Supplier Name" />
                          {errors.suppliername && <span className="error">{errors.suppliername}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Supplier Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="supplieremail" id="exampleInputUsername2" onChange={e =>setValues({...values, supplieremail: e.target.value})} placeholder="Supplier Email" />
                          {errors.supplieremail && <span className="error">{errors.supplieremail}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label"> Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="suppliermobile" id="exampleInputUsername2" onChange={e =>setValues({...values, suppliermobile: e.target.value})} placeholder="Mobile Number" />
                          {errors.suppliermobile && <span className="error">{errors.suppliermobile}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Tax Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="taxnumber" id="exampleInputUsername2" onChange={e =>setValues({...values, taxnumber: e.target.value})} placeholder="Tax Number" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">License Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="licensenumber" id="exampleInputUsername2" onChange={e =>setValues({...values, licensenumber: e.target.value})} placeholder="License Number" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="supplieraddress" id="exampleInputUsername2" onChange={e =>setValues({...values, supplieraddress: e.target.value})} placeholder="Address" />
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

export default AddSupplier;