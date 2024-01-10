import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';

const PosTodayOrder =() =>{

    const [posTodayorder, setPosTodayorder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [kotdata,setkotData] =useState(null);
    const [showkotModal,setShowKotModal] =useState(false);
    const [printOrderId, setPrintOrderId] = useState(null);

    const totalGrandTotal = Array.isArray(posTodayorder)
    ? posTodayorder.reduce((total, order) => {
        // Ensure grandTotal is present and is a number before adding it to the total
        const orderGrandTotal = parseFloat(order.grandTotal);
        return !isNaN(orderGrandTotal) ? total + orderGrandTotal : total;
      }, 0)
    : 0;

    const componentRef = useRef();
    
    const handlePrint = (orderId) => {
      const selectedOrder = posTodayorder.find((order) => order._id === orderId);
      setPrintOrderId(orderId);
      setData(selectedOrder);
      setShowModal(true);
      // Open a new window for printing
      
     
    };

    useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/gettodayOrder`)
          .then((response) => response.json())
          .then((data) => setPosTodayorder(data))
          .catch((error) => console.error(error));
      }, []);

      const handleComplete =(id) =>{
        console.log(id);
        axios.get(`${apiConfig.baseURL}/api/pos/getcomplete/${id}`)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            setShowModal(true);

          
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });



    }

    const handlekot =(id) =>
{

  const url = `${apiConfig.baseURL}/api/pos/getKot/${id}`;
  axios.get(url)
  .then((response) => {
    setkotData(response.data);
    console.log(response.data);
    setShowKotModal(true);
  })
  
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

}

const handlePrints = () => {
  if (componentRef.current) {
    // Assuming your modal content has a handlePrint method
    if (componentRef.current.handlePrint) {
      componentRef.current.handlePrint();
    } else {
      // If handlePrint is not defined, you can use window.print() for a simple print
      window.print();
    }
  }
};


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
                            <th>Grand Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
  {
   Array.isArray(posTodayorder) && posTodayorder.length > 0 ? ( 
   posTodayorder.map((order,key) => (
    <tr key={order._id}>
     <td>{key + 1}</td>
      <td>{order.options}</td>

      <td>{order.waiter ? order.waiter.waitername : 'N/A'}</td>
      <td>{order.total}</td>
      <td>{order.vatAmount}</td>
    
      <td>{order.user ? `${order.user.firstname} ${order.user.lastname || ''}` : 'N/A'}</td>
      <td>{order.grandTotal}</td>

      <td>
        <a onClick={(e) => handleComplete(order._id)} className="btn btn-primary" data-toggle="tooltip" data-placement="right" title="Print">
        <i className="mdi mdi-cloud-print-outline"></i>
        </a>
        <a onClick={(e) => handlekot(order._id)} className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Kitchen Order">
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
          <td colSpan="5"></td>
          <td>Total Grand Total:</td>
          <td>{totalGrandTotal}</td>
        </tr>
      </tfoot>
                </table>
            </div>
            <div>
 <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" ref={componentRef} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
              
              { data ? (
data.map((order) => (
               <div key={order.id}>
               <h5>Order Number: {order.ordernumber}</h5>
               <h6>Options: {order.options}</h6>
               <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
      <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
      <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                <table className="table   table-bordered">
                <thead>
                <tr>
                    <th>Si No</th>
                    <th>Food Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                 
                  {order.cart.map((cartItem,key) => (
                <tr key={cartItem.foodmenuId}>
                  <td>{key + 1}</td>
                  <td>{cartItem.menuItemDetails.foodmenuname}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.salesprice}</td>
                 
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6>Total :{order.total}</h6>
                <h6>Vat Amount :{order.vatAmount}</h6>
                <h6>Grand Total :{order.grandTotal}</h6>


                <div className="modal-footer">
             
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
   
             </div>
           
              ))
              ):(
                <p>No data</p>
              )
            }
            </div>
         
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>
    <div>
  
  <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }}>
         <div className="modal-dialog" role="document">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title">KOT</h5>
               <button type="button" className="close" onClick={() => setShowModal(false)}>
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div className="modal-body">
               {/* Display the data here */}
               
               { kotdata ? (
 kotdata.map((order) => (
                <div key={order.id}>
                <h5>Order Number: {order.ordernumber}</h5>
                <h6>Options: {order.options}</h6>
                <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
       <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
       <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                 <table className="table   table-bordered">
                 <thead>
                 <tr>
                     <th>Si No</th>
                     <th>Food Name</th>
                     <th>Quanity</th>
                     <th>Price</th>
                     </tr>
                 </thead>
                 <tbody>
                  
                   {order.cart.map((cartItem,key) => (
                 <tr key={cartItem.foodmenuId}>
                   <td>{key + 1}</td>
                   <td>{cartItem.menuItemDetails.foodmenuname}</td>
                   <td>{cartItem.quantity}</td>
                   <td>{cartItem.salesprice}</td>
                 
                   {/* Render other cart item details here */}
                 </tr>
               ))}
                 
                 </tbody>
                 </table>
                 <h6 className="text-right">Total :{order.total}</h6>
                 <h6 className="text-right">Vat Amount :{order.vatAmount}</h6>
                 <h6 className="text-right">Grand Total :{order.grandTotal}</h6>
 
            
 
                 <div className="modal-footer">
                 <button type="button" onClick={handlePrint}  className="btn btn-outline-primary" >Print</button> 
               <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
             </div>
    
              </div>
            
               ))
               ):(
                 <p>No data</p>
               )
             }
             </div>
          
           </div>
         </div>
       </div>
       <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
       
       
     </div>
        </div>
    )

}
export default PosTodayOrder;