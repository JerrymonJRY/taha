import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const ViewCustomer =() =>{

  const [data , setData] =useState([]);
  const navigate = useNavigate();
  useEffect( ()=>{

      axios.get(`${apiConfig.baseURL}/api/customer/allCustomer`)
      .then((res) => {
        setData(res.data);

        // Initialize DataTables after data is loaded
        $(document).ready(function () {
          $('#example_table').DataTable();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete =(id) =>
  {
      const confirm =window.confirm('Are You Delete');
      if(confirm)
      {
          axios.delete(`${apiConfig.baseURL}/api/customer/deleteCustomer/${id}`)
          .then(res =>{

             
              navigate('/viewTable');
              console.log(res);
          }).catch(err =>console.log(err));
      }
  }

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
                    <h4 className="card-title">Customer List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addCustomer" className="btn btn-success">Add +</Link>
                </div>
                  
                    <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.customername}
                                </td>
                                <td>
                                    {d.customeremail}
                                </td>
                                <td>
                                    {d.customermobile}
                                </td>
                                <td>
                                    {d.customeraddress}
                                </td>
                               
                                <td>
                                <Link to={`/editCustomer/${d._id}`} className="btn btn-primary">Edit</Link>
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
export default ViewCustomer;