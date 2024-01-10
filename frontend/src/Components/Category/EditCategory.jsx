import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const EditCategory =() =>{


    const {id} =useParams()
    const [categoryname,setCategoryName] =useState()
    const [description,setDescription] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/category/getcategory/${id}`)
        .then(res => { console.log(res)
             setCategoryName(res.data.categoryname)
             setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/category/updatecategory/${id}`,{categoryname,description})
        .then(res =>{

            console.log(res);
            navigate('/viewingredientfoodcategory');
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
              <h3 className="page-title"> Food Category </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Food Category</li>
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
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Category</label>
                        <div className="col-sm-9">
                          <input type="text" value={categoryname} onChange={(e)=>setCategoryName(e.target.value)} className="form-control"  name="categoryname" id="exampleInputUsername2"  placeholder="Food Description" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Description</label>
                        <div className="col-sm-9">
                          <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control"  name="description" id="exampleInputUsername2" placeholder="Food Category" />
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

export default EditCategory;