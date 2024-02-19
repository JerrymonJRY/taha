import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import ReactToPrint   from "react-to-print";

const RunningOrderKot =({kotdata,showkotModal,setShowKotModal}) =>
{
    const componentRef = useRef();

    const kotModalRef = useRef();
  
    const handlePrint = () => {
      if (kotModalRef.current) {
        // Use ReactToPrint to handle the print action for the KOT modal
        kotModalRef.current.handlePrint();
      }
    }
    return (
        <div>
   
        <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }} >
               <div className="modal-dialog" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">KOT</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body" ref={kotModalRef}>
                    
                     
                     {kotdata ? (
        kotdata.map((order) => {

          const subtotal = order.cart.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.salesprice), 0);
          const vatPercentValue = 5;
          const vatAmount = (subtotal * vatPercentValue) / 100;
          const subTotals = subtotal - vatAmount;
          const grandTotal =subTotals + vatAmount;
          const orderDate = new Date(order.date);
          const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}-${orderDate.getFullYear()}`;
          const formattedTime = `${orderDate.getHours().toString().padStart(2, '0')}:${orderDate.getMinutes().toString().padStart(2, '0')}:${orderDate.getSeconds().toString().padStart(2, '0')}`;



          return (
          <div key={order.id} className="order-container">
            <h5>Order Number: {order.ordernumber}</h5>
            <h6>Options: {order.options}</h6>
            <h6>Customer Name: {order.customerDetails?.customername || 'N/A'}</h6>
            <h6>Table: {order.tableDetails?.tablename || 'N/A'}</h6>
            <h6>Waiter: {order.waiterDetails?.waitername || 'N/A'}</h6>
            <h6>Date & Time:{formattedDate} {formattedTime}</h6>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Si No</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((cartItem, index) => (
                  <tr key={String(cartItem.foodmenuId)}>
                    <td>{index + 1}</td>
                    <td>{cartItem.menuItemDetails?.foodmenuname || 'N/A'}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.salesprice}</td>
                    <td>{cartItem.quantity * cartItem.salesprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
            <h6 className="text-right">Subtotal: {subTotals}</h6>
            <h6 className="text-right">VAT Amount ({vatPercentValue}%): {vatAmount}</h6>
            <h6 className="text-right">Grand Total: {grandTotal}</h6>
          </div>
          )
})
      ) : (
        <p>No data</p>
      )}
                   </div>
                   <div className="modal-footer">
                       {/* <button type="button" onClick={handlePrint}  className="btn btn-outline-primary" >Print</button>  */}
                   <ReactToPrint
               trigger={() => <button onClick={handlePrint}>Print KOT</button>}
               content={() => kotModalRef.current}
             />
                   
                     <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
                   </div>
       
                  
                
                 </div>
               </div>
             </div>
             <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
             
             
           </div>
    )
}

export default RunningOrderKot;