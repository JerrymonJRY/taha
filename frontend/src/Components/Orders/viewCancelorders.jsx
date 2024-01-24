import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import apiConfig from '../layouts/base_url';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";


const CancelOrders =() =>{

    const [posfood, setPosFood] = useState([]);

    useEffect(() => {
        axios
          .get(`${apiConfig.baseURL}/api/pos/cancelorders`)
          .then((res) => {
            setPosFood(res.data);
    
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
                    <h4 className="card-title">Cancel Orders</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/pos" className="btn btn-success">Pos +</Link>
                </div>
                  
                <table className="table table-hover" id="example_table" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Order Number</th>
                            <th>Order Option</th>
                         <th>Waiter Name</th>
                     
                      <th>Subtotal</th>
                      <th>Vat</th>
                      <th>Grand Total</th>
                      <th>Date and Time</th>
                      <th>Billed By</th>
                      <th>Approved By</th>
                      <th>Role</th>
                       
                      
                        </tr>
                      </thead>
                      <tbody>
  {posfood.map((order) => {


const subtotal = order.total;
const vat = 5;
const vatamounts = (subtotal * vat) / 100;
const subtotalAfterVat = subtotal - vatamounts;

const isoDateString = order.date;
const dateObject = new Date(isoDateString);

// Format the date and time
const formattedDate = dateObject.toLocaleDateString(); // e.g., "1/24/2024"
const formattedTime = dateObject.toLocaleTimeString();

    return (
    <tr key={order._id}>
      <td>{order.ordernumber}</td>
      <td>{order.options}</td>
      <td>{order.waiter.waitername}</td>

     
      <td>{subtotalAfterVat}</td>
      <td>{vatamounts}</td>
      <td>{order.grandTotal}</td>
      <td>{formattedDate} {formattedTime}</td>
      <td>{order.user.firstname} {order.user.lastname}</td>
      <td>{order.cancels.firstname} {order.cancels.lastname}</td>
      <td>{order.cancels.userrole} </td>

    
    </tr> 
    );
})}
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

export default CancelOrders