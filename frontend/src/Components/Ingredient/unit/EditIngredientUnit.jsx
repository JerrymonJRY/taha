import React from "react";
import { useState,useEffect } from "react";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import apiConfig from '../../layouts/base_url';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";


const EditIngredientUnit =() =>{

    const {id} =useParams()
    const [unitname,setUnitName] =useState()
    const [description,setDescription] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/ingunit/getingunit/${id}`)
        .then(res => { console.log(res)
            setUnitName(res.data.unitname)
             setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/ingunit/updateingunit/${id}`,{unitname,description})
        .then(res =>{

            console.log(res);
            navigate('/viewingredientunit');
        })
        .catch(err =>console.log(err));
    }
    return (
        <div class="container-scroller">
        <Header />
        <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Ingrdient Unit </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit Ingredient Unit</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        <div className="row">
                          
                            <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Intgredient Unit</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="unitname" id="exampleInputUsername2" value={unitname} onChange={(e)=>setUnitName(e.target.value)} placeholder="Food Description" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label"> Description</label>
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

export default EditIngredientUnit;