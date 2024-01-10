import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link ,useParams} from "react-router-dom";
import apiConfig from '../layouts/base_url';
const EditFoodCategory =() =>{

    const {id} =useParams()
    const [foodcategoryname,setfoodCategoryName] =useState()
    const [description,setDescription] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/foodcategory/getfoodcategory/${id}`)
        .then(res => { console.log(res)
            setfoodCategoryName(res.data.foodcategoryname)
             setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/foodcategory/updatefoodCategory/${id}`,{foodcategoryname,description})
        .then(res =>{

            console.log(res);
            navigate('/viewfoodcategory');
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
              <h3 className="page-title"> Add Food Category </h3>
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
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Category Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="foodcategoryname" id="exampleInputUsername2" value={foodcategoryname} onChange={(e)=>setfoodCategoryName(e.target.value)} placeholder="Food Description" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Food Category" />
                        </div>
                      </div>
                      
                    
                           
                      
                        </div>
                   
                      <button type="submit" className="btn btn-gradient-primary me-2">Update</button>
                     
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

export default EditFoodCategory;