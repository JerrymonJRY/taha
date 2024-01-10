import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const EditCustomer =() =>{

    const {id} =useParams()
    const [customername,setCustomername] =useState()
    const [customeremail,setCustomeremail] =useState()
    const [customermobile,setCustomermobile] =useState()
    const [customeraddress,setCustomeraddress] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/customer/getCustomer/${id}`)
        .then(res => { console.log(res)
            setCustomername(res.data.customername)
            setCustomeremail(res.data.customeremail)
            setCustomermobile(res.data.customermobile)
            setCustomeraddress(res.data.customeraddress)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/customer/updateCustomer/${id}`,{customername,customeremail,customermobile,customeraddress})
        .then(res =>{

            console.log(res);
            navigate('/viewCustomer');
        })
        .catch(err =>console.log(err));
    }

   
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
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customername" id="exampleInputUsername2" value={customername} onChange={(e)=>setCustomername(e.target.value)} placeholder="Customer Name" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customeremail" id="exampleInputUsername2" value={customeremail} onChange={(e)=>setCustomeremail(e.target.value)} placeholder="Customer Email" />
                        </div>
                      </div>


                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Mobile</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="customermobile" id="exampleInputUsername2" value={customermobile} onChange={(e)=>setCustomermobile(e.target.value)} placeholder="Customer Email" />
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Customer Address</label>
                        <div className="col-sm-9">
                        <textarea className='form-control' name='customeraddress'value={customeraddress} onChange={(e)=>setCustomeraddress(e.target.value)}></textarea>
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

export default EditCustomer;