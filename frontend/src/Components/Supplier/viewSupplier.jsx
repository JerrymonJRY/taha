import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const ViewSupplier =() =>
{
    const [data , setData] =useState([]);
    const navigate = useNavigate();
    useEffect( ()=>{
  
        axios.get(`${apiConfig.baseURL}/api/supplier/allSupplier`)
        .then((res) => {
          setData(res.data);
  
          // Initialize DataTables after data is loaded
          $(document).ready(function () {
            $('#example_table').DataTable();
          });
        })
        .catch((err) => console.log(err));
    }, []);
    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
                  <div className="content-wrapper">
                  <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Supplier List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addSupplier" className="btn btn-success">Add +</Link>
                </div>
                  
                <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Supplier Name</th>
                          <th>Supplier Mobile </th>
                        <th>Tax Number</th>
                        <th>License Number</th>
                        <th>Address</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.suppliername}
                                </td>
                                <td>
                                    {d.suppliermobile}
                                </td>
                                <td>
                                    {d.taxnumber}
                                </td>
                                <td>
                                    {d.licensenumber}
                                </td>
                                <td>
                                    {d.supplieraddress}
                                </td>
                               
                                <td>
                                <Link to={`/editSupplier/${d._id}`} className="btn btn-primary">Edit</Link>
                                    <button onClick={  (e)=>handleDelete(d._id)} className="btn btn-danger">Delete</button>
                                </td>

                            </tr>

                        ))
                    }
                      </tbody>
                    </table>
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

export default ViewSupplier;