import React from "react";
import { useState } from "react";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import apiConfig from '../../layouts/base_url';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";


const AddIngredientUnit =() =>{

    const [values,setValues] = useState({

        unitname :'',
        description:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/ingunit/createingunit`,values)
        .then(res =>{

            console.log(res);
            navigate('/viewingredientunit');
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
  
      if (!data.unitname) {
        errors.unitname = "Ingredient Unit is required";
      }
  
     
      return errors;
    };
    return (
        <div class="container-scroller">
        <Header />
        <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Ingredient Unit </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Ingredient Unit</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food Intgredient Unit</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="unitname" id="exampleInputUsername2" onChange={e =>setValues({...values, unitname: e.target.value})} placeholder="Ingredient Unit " />
                          {errors.unitname && <span className="error">{errors.unitname}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" onChange={e =>setValues({...values, description: e.target.value})} placeholder="Description" />
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

export default AddIngredientUnit;