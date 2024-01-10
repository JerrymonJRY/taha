import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const AddFoodCategory =() =>{

    const [values,setValues] = useState({

        foodcategoryname :'',
        description:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/foodcategory/createfoodcategory`,values)
        .then(res =>{

            console.log(res);
            navigate('/viewfoodcategory');
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
  
      if (!data.foodcategoryname) {
        errors.foodcategoryname = "Food Category Name is required";
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food Category Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="foodcategoryname" id="exampleInputUsername2" onChange={e =>setValues({...values, foodcategoryname: e.target.value})} placeholder="" />
                          {errors.foodcategoryname && <span className="error">{errors.foodcategoryname}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" onChange={e =>setValues({...values, description: e.target.value})} placeholder="" />
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

export default AddFoodCategory;