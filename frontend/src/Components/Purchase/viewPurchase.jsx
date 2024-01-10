import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';


const ViewPurchase =() =>
{
  const [data , setData] =useState([]);
    const navigate = useNavigate();
    useEffect( ()=>{
  
        axios.get(`${apiConfig.baseURL}/api/purchase/all`)
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
                    <h4 className="card-title">Purchase List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addPurchase" className="btn btn-success">Add +</Link>
                </div>
                  
                <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Invoice Number</th>
                          <th>Supplier Name </th>
                        <th>Date</th>
                        <th>Paid Amount</th>
                        <th>Due Amount</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.invoicenumber}
                                </td>
                                <td>
                                    {d.supplierDetails.suppliername}
                                </td>
                                <td>
                                    {d.invoiceDate}
                                </td>
                                <td>
                                    {d.paidAmount}
                                </td>
                                <td>
                                    {d.dueAmount}
                                </td>
                                <td>
                                    {d.grandTotal}
                                </td>
                               
                                <td>
                                <Link to={`/editPurchase/${d._id}`} className="btn btn-primary">Edit</Link>
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

export default ViewPurchase;