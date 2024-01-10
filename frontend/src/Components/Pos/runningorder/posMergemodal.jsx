import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';

const PosMergemodal = ({ mergdata, mergeModal,setMergeModal }) =>{


  const calculateTotals = () => {
    if (mergdata && mergdata.length > 0) {
      const totalAmount = mergdata.reduce((acc, order) => acc + parseInt(order.total, 10), 0);
      const totalVat = mergdata.reduce((acc, order) => acc + parseFloat(order.vatAmount), 0);
      const totalGrandTotal = mergdata.reduce((acc, order) => acc + parseInt(order.grandTotal, 10), 0);
  
      return { totalAmount, totalVat, totalGrandTotal };
    }
  
    return { totalAmount: 0, totalVat: 0, totalGrandTotal: 0 };
  };

  const { totalAmount, totalVat, totalGrandTotal } = calculateTotals();
  

  const [payments,setPayments] =useState();
  const [validationMsg, setValidationMsg] = useState("");
  const payment  = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
   
  ];

  const handlePaymentChange = (event) => {
    setPayments(event.target.value);
    setValidationMsg(""); // Clear validation message when the payment option changes
  };


  const handlePayNowClick = () => {
    if (!payments || payments === "Select Payment") {
      setValidationMsg("Please select a valid payment option.");
    } else {
      // Perform the payment logic here
      // ...
      setValidationMsg("Payment successful!"); // You can replace this with your actual logic
    }
  };



    return(
        <div>
   
        <div className={`modal ${mergeModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mergeModal ? 'block' : 'none' }} >
        <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Merge Orders</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                       <table className="table table-bordered">
                           <thead>
                             <th>Si No</th>
                             <th>Order Number</th>
                             <th> Amount</th>
                             <th>Vat</th>
                             <th>Grand Total</th>
                           </thead>
                           <tbody>
      { mergdata ? (mergdata.map((order,key) => (
       <tr key={order._id}>
             <td>{key + 1}</td>
             <td>{order.ordernumber}</td>
             <td>{order.total}</td>
             <td>{order.vatAmount}</td>
             <td>{order.grandTotal}</td>
         </tr>
                
                   ))
                   ):(
                     <p>No data dddd</p>
                    
                   )
                 }
                           </tbody>
                           <tfoot>
                  <tr>
                    <td colSpan="2">Totals:</td>
                    <td>{totalAmount}</td>
                    <td>{totalVat}</td>
                    <td>{totalGrandTotal}</td>
                  </tr>
                </tfoot>
                       </table>
                       <div className="row">
                        
                        
                        <div className="form-group row">
                                <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Select Payment</label>
                                <div className="col-sm-9">
                                <select className="form-control"  value={payments} onChange={handlePaymentChange}>
                                  <option>Select Payment</option>
                                  {payment.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
                                </select>
                                {validationMsg && <p className="text-danger">{validationMsg}</p>}
                                </div>
                              </div>
                        </div>
                   </div>
                   <div className="modal-footer">
                   <button type="button" className="btn btn-outline-primary"  onClick={handlePayNowClick} >Pay Now</button> 
                   <button type="button" className="btn btn-outline-secondary" onClick={() => setMergeModal(false)}>Close</button>
                   </div>
       
                  
                
                 </div>
               </div>
             </div>
             <div className={`modal-backdrop ${mergeModal ? 'show' : ''}`} style={{ display: mergeModal ? 'block' : 'none' }}></div>
             
             
           </div>
    )
}

export default PosMergemodal;