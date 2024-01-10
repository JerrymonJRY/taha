import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const EditTable =() =>{

    const {id} =useParams()
    const [tablename,seTableName] =useState()
    const [Position,setPosition] =useState()
    const [seatcapacity,setSeatCapacity] =useState()
    const [description,setDescription] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/table/gettable/${id}`)
        .then(res => { console.log(res)
            seTableName(res.data.tablename)
            setPosition(res.data.Position)
            setSeatCapacity(res.data.seatcapacity)
             setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/table/updateTable/${id}`,{tablename,Position,seatcapacity,description})
        .then(res =>{

            console.log(res);
            navigate('/viewTable');
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
                          <input type="text" className="form-control" name="tablename" id="exampleInputUsername2" value={tablename} onChange={(e)=>seTableName(e.target.value)} placeholder="Enter Table Tame" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Position</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="Position" id="exampleInputUsername2" value={Position} onChange={(e)=>setPosition(e.target.value)} placeholder="Enter Posistion" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Seat Capacity</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="seatcapacity" id="exampleInputUsername2" value={seatcapacity} onChange={(e)=>setSeatCapacity(e.target.value)} placeholder="Enter Seat Capacity" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Description" />
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

export default EditTable;