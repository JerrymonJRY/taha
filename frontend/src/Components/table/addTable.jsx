import React from 'react'
import { useState } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const AddTable =() =>{
    const [values,setValues] = useState({

        tablename :'',
        Position:'',
        seatcapacity :'',
        description:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
        axios.post(`${apiConfig.baseURL}/api/table/createtable`,values)
        .then(res =>{

            console.log(res);
            navigate('/viewTable');
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
  
      if (!data.tablename) {
        errors.tablename = "Table Name is required";
      }

      if (!data.Position) {
        errors.Position = "Posistion is required";
      }

      if (!data.seatcapacity) {
        errors.seatcapacity = "Seat Capacity is required";
      } else if (!/^\d+$/.test(data.seatcapacity)) {
        errors.seatcapacity = "Only numbers are allowed in the Seat Capacity";
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
              <h3 className="page-title"> Add Table </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Table</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Table</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Table Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="tablename" id="exampleInputUsername2" onChange={e =>setValues({...values, tablename: e.target.value})} placeholder="Enter Table Tame" />
                          {errors.tablename && <span className="error">{errors.tablename}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Position</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="Position" id="exampleInputUsername2" onChange={e =>setValues({...values, Position: e.target.value})} placeholder="Enter Posistion" />
                          {errors.Position && <span className="error">{errors.Position}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Seat Capacity</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="seatcapacity" id="exampleInputUsername2" onChange={e =>setValues({...values, seatcapacity: e.target.value})} placeholder="Enter Seat Capacity" />
                          {errors.seatcapacity && <span className="error">{errors.seatcapacity}</span>}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="Position" id="exampleInputUsername2" onChange={e =>setValues({...values, description: e.target.value})} placeholder="Enter Description" />
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

export default AddTable;