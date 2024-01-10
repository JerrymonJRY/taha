import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const ViewDelivery =() =>{


  const [data , setData] =useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/delivery/alldelivery`)
      .then((res) => {
        setData(res.data);

        // Initialize DataTables after data is loaded
        $(document).ready(function () {
          $('#example_table').DataTable();
        });
      })
      .catch((err) => console.log(err));
  }, []);



  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${apiConfig.baseURL}/api/waiter/deletewaiter/${id}`)
          .then((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            // Refresh data after successful delete
            axios.get(`${apiConfig.baseURL}/api/delivery/alldelivery`)
              .then((response) => {
                setData(response.data);
              })
              .catch((error) => console.error(error));
          })
          .catch((err) => console.log(err));
      }
    });
  };

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
                    <h4 className="card-title"> Delivery Person List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addDelivery" className="btn btn-success">Add +</Link>
                </div>
                  
                <table className="table table-hover" id="example_table" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Delivery Name</th>
                         
                          <th>Mobile Number</th>
                       
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.dliveryname}
                                </td>
                                <td>
                                    {d.deliverymobile}
                                </td>
                                
                                <td>
                                <Link to={`/editWaiter/${d._id}`} className="btn btn-primary">Edit</Link>
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
    );
}
export default ViewDelivery;