import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from 'react-to-print';
import DataTable from "react-data-table-component";

import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';


const PosOrderPrint =({orderData,showPrintModal,setShowPrintModal}) =>{

    const componentRef = React.useRef();

    const handleClosePrint = () => {
        setShowPrintModal(false);
        
      }

      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    return (
        <div>
        <div className={`modal ${showPrintModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showPrintModal ? 'block' : 'none' }}>
          <div className="modal-dialog modal-md" role="document" style={{ maxWidth: '1200px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pos Closing Balance</h5>
                <button type="button" className="close" onClick={handleClosePrint}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body" ref={componentRef}>
              {Array.isArray(orderData) && orderData.length > 0 ? (
  orderData.map((order) => (
    <React.Fragment key={order.ordernumber}>
      <h2>Ordernumber: {order.ordernumber}</h2>
      <h4>Options: {order.options}</h4>
      <table className="table table-border">
        {/* ... (rest of the table rendering code) */}
      </table>
      <h6 className="text-right">Total: {order.total}</h6>
      <h6 className="text-right">Vat Amount: {order.vatAmount}</h6>
      <h6 className="text-right">Grand Total: {order.grandTotal}</h6>
    </React.Fragment>
  ))
) : (
  <p>No data</p>
)}

  
  
  
  
  
  
              </div>
              <div className="modal-footer">
              <button onClick={handlePrint}>Print</button>
          
              </div>
  
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${showPrintModal ? 'show' : ''}`} style={{ display: showPrintModal ? 'block' : 'none' }}></div>
      </div>
    )
}


export default PosOrderPrint;