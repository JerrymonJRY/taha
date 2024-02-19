import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const EditSupplier =() =>
{
    const {id} =useParams()
    const navigate = useNavigate();
    const [suppliername,setSupplierName] =useState()
    const [supplieremail,setSupplierEmail] =useState()
    const [suppliermobile,setSupplierMobile] =useState()
    const [taxnumber,setTaxNumber] =useState()
    const [licensenumber,setLicenseNumber] =useState()
    const [supplieraddress,setSupplierAddress] =useState()

  
    useEffect( ()=>{

      axios.get(`${apiConfig.baseURL}/api/supplier/getSupplier/${id}`)
      .then(res => { console.log(res)
        setSupplierName(res.data.suppliername)
        setSupplierEmail(res.data.supplieremail)
        setSupplierMobile(res.data.suppliermobile)
        setTaxNumber(res.data.taxnumber)
      
        setLicenseNumber(res.data.licensenumber)
        setSupplierAddress(res.data.supplieraddress)
      
      
  })
      .catch(err =>console.log(err));

  },[])
   



    const handleSubmit =(e) =>
    {
      e.preventDefault();

      axios
      .put(`${apiConfig.baseURL}/api/supplier/updateSupplier/${id}`, { suppliername, supplieremail,suppliermobile,taxnumber,licensenumber,supplieraddress })
      .then((res) => {
        console.log(res);

        // Display success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Supplier Updated!',
          text: 'Your Supplier has been updated successfully.',
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
      .catch((err) => {
        console.log(err);
        // Handle error and display an error message if needed
      });



    }

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
                         
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Supplier Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="supplieremail" id="exampleInputUsername2" value={supplieremail} onChange={(e)=>setSupplierEmail(e.target.value)} placeholder="Supplier Email" />
                         
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label"> Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="suppliermobile" id="exampleInputUsername2" value={suppliermobile} onChange={(e)=>setSupplierMobile(e.target.value)} placeholder="Mobile Number" />
                         
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Tax Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="taxnumber" id="exampleInputUsername2" value={taxnumber} onChange={(e)=>setTaxNumber(e.target.value)} placeholder="Tax Number" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">License Number</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="licensenumber" id="exampleInputUsername2" value={licensenumber} onChange={(e)=>setLicenseNumber(e.target.value)} placeholder="License Number" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="supplieraddress" id="exampleInputUsername2" value={supplieraddress} onChange={(e)=>setSupplierAddress(e.target.value)} placeholder="Address" />
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