import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

const PrintComponent = ({ order }) => {
    return (
      <div>
        <h5>Order Number: {order.ordernumber}</h5>
        <h6>Options: {order.options}</h6>
        <h6>Customer Name: {order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
        <h6>Table: {order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
        <h6>Waiter: {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Si No</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.cart.map((cartItem, key) => (
              <tr key={cartItem.foodmenuId}>
                <td>{key + 1}</td>
                <td>{cartItem.menuItemDetails.foodmenuname}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.salesprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h6>Total: {order.total}</h6>
        <h6>Vat Amount: {order.vatAmount}</h6>
        <h6>Grand Total: {order.grandTotal}</h6>
      </div>
    );
  };

  export default PrintComponent;