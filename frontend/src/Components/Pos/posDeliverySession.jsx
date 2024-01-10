import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';

const PosDeliverySession =() =>{

    const [posTodaydelivery, setPosTodayDelivery] = useState([]);

    useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/gettodaydelivery`)
          .then((response) => response.json())
          .then((data) => setPosTodayDelivery(data))
          .catch((error) => console.error(error));
      }, []);


      const totalGrandTotal = Array.isArray(posTodaydelivery)
      ? posTodaydelivery.reduce((total, order) => {
          // Ensure grandTotal is present and is a number before adding it to the total
          const orderGrandTotal = parseFloat(order.grandTotal);
          return !isNaN(orderGrandTotal) ? total + orderGrandTotal : total;
        }, 0)
      : 0;
  


    return (
        <div className="container">
            <div className="row">
            <table className="table table-hover">
                    
                    <thead>
                        <tr>
                            <th>SI No</th>
                            <th>Select Option</th>
                            <th>Waiter</th>
                            <th>Total</th>
                            <th>Vat Amount</th>
                            
                            <th>Added By</th>
                            <th>Deliverd By</th>
                            <th>Grand Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
  {
   Array.isArray(posTodaydelivery) && posTodaydelivery.length > 0 ? ( 
    posTodaydelivery.map((order,key) => (
    <tr key={order._id}>
     <td>{key + 1}</td>
      <td>{order.options}</td>

      <td>{order.waiter ? order.waiter.waitername : 'N/A'}</td>
      <td>{order.total}</td>
      <td>{order.vatAmount}</td>
    
      <td>{order.user ? `${order.user.firstname} ${order.user.lastname || ''}` : 'N/A'}</td>
      <td>{order.deliveryperson ? order.deliveryperson.dliveryname : 'N/A'  }</td>
      <td>{order.grandTotal}</td>

      <td>
        <a  className="btn btn-primary" data-toggle="tooltip" data-placement="right" title="Print">
        <i className="mdi mdi-cloud-print-outline"></i>
        </a>
        <a  className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Kitchen Order">
          <i className="mdi mdi-food-variant"></i>
        </a>
      </td>
    </tr>
  ))
  ):(
    <tr>
    <td colSpan="7">No data available</td>
  </tr>
  )}
                       
                    </tbody>
                    <tfoot>
        <tr>
          <td colSpan="6"></td>
          <td>Total Grand Total:</td>
          <td>{totalGrandTotal}</td>
        </tr>
      </tfoot>
                </table>
       
     </div>
        </div>
    )

}
export default PosDeliverySession;