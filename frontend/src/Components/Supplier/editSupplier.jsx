import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const EditSupplier =() =>
{
    const {id} =useParams()
    const [suppliername,setSupplierName] =useState()
    const [supplieremail,setSupplierEmail] =useState()
    const [suppliermobile,setSupplierMobile] =useState()
    const [taxnumber,setTaxNumber] =useState()
    const [licensenumber,setLicenseNumber] =useState()

  
    const navigate = useNavigate();

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
                          <input type="text" className="form-control" name="suppliername" id="exampleInputUsername2" value={suppliername} onChange={(e)=>setSupplierName(e.target.value)} placeholder="Supplier Name" />
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

export default EditSupplier;