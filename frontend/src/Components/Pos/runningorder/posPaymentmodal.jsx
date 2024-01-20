import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
const RunningPaymentModal = ({ data, showModal, setShowModal }) => {

  const navigate = useNavigate();

  const [payments, setPays] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [processedIds, setProcessedIds] = useState([]);
  const [addedby, setuserid] = useState("");
  const [shiftstoken, setShiftstoken] = useState('');
  const imageName = "taha.png";
  const [itemTotalPrices, setItemTotalPrices] = useState([]);

  useEffect(() => {
    const storeid = localStorage.getItem("_id");
    const storetoken = localStorage.getItem('shifttoken');
    setuserid(storeid);
    setShiftstoken(storetoken)
  }, []);

  const payment = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },

  ];

  const handlePays = (event) => {
    setPays(event.target.value);
    setPaymentError('');
    //  alert({svat});
  }

  const [shiftAccess, setShiftAccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('_id');

        if (!id) {
          // Handle the case when storeid is not available in localStorage
          console.error('Store ID not found in localStorage');
          return;
        }

        //const response = await axios.get(`${apiConfig.baseURL}/api/pos/getShiftAccess?storeid=${storeid}`);
       const response = await axios.get(`${apiConfig.baseURL}/api/pos/getShiftAccess`, {
          params: {
            id: id,
          },
        });
       // console.log(response.data);
       const shiftdata = response.data;

        // Assuming response.data contains the shiftAccess data
        setShiftAccess(shiftdata.shiftacess);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


  const handleMakePayment = (id, order) => {

    if (!order || order?.grandTotal == null) {
      // Handle the case where order is null or grandTotal is not available
      console.error("Invalid order data");
      return;
    }

    if (!payments) {
      setPaymentError('Please select a payment option'); // Set the validation error message
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select a payment option.',
      });
      return;
    }

    var formData = new FormData();
    formData.append("paymentType", payments);
    formData.append("total", order.total);
    formData.append("vatAmount", order.vatAmount);
    formData.append("grandTotal", order.grandTotal);
    formData.append("addedby", addedby);
    formData.append("shiftstoken", shiftstoken);
    formData.append('opentoken',shiftAccess)

    //formData.append("foodmenuname", foodmenuname);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const url = `${apiConfig.baseURL}/api/pos/updatePayment/${id}`;

    axios.put(url, formData, config)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Do you want to print the order?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes, print',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            // Open your print modal here
            console.log(res);
            printOrderDetails(res.data);
            navigate('/runningorder');
            // openPrintModal(res.data);
          } else {
            // setProcessedIds([...processedIds, id]);
            closeModal();
          }
        });
      })
      .catch(err => console.log(err));
  }


  const imagePaths = "/assets/images/pos/taha.png";



  const printOrderDetails = (orderData) => {
    const printWindow = window;
    printWindow.document.write('<html><head><title>Order Details</title>');
    // Add style for center alignment and table styling
    printWindow.document.write(`
      <style>
        body { text-align: center; }
        table {
          width: 100%;
          border-collapse: collapse;
         
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        td
        {
          font-size:13px;
          text-transform: capitalize;
        }
        .order-info {
          font-size:13px;
          text-transform: capitalize;
        }
      </style>
    `);
    printWindow.document.write('</head><body>');
    
    // Include order details and image in the print window
    
    printWindow.document.write(`<img src="${imagePaths}" alt="Logo" style="max-width: 100%;" onload="window.print(); location.reload();">`);
    printWindow.document.write(`<p>Bill Number: ${orderData.billnumber}</p>`);
    printWindow.document.write(`<p>Order ID: ${orderData.ordernumber}</p>`);
    const orderDate = new Date(orderData.date);
const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}-${orderDate.getFullYear()}`;
printWindow.document.write(`<p>Date: ${formattedDate}</p>`);
   
    
if (orderData.cart && orderData.cart.length > 0) {
  printWindow.document.write(`
    <table>
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Qty</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
  `);
  
  let subtotal = 0;

  orderData.cart.forEach((item) => {
    const totalPrice = item.quantity * item.salesprice;
    subtotal += totalPrice;

    printWindow.document.write(`
      <tr>
        <td>${item.foodmenuname}</td>
        <td>${item.quantity}</td>
        <td>${totalPrice}</td>
      </tr>
    `);
  });

  // Calculate VAT amount and overall total
  const vatPercentValue = 5;
  const vatAmounts = (subtotal * vatPercentValue) / 100;
  const overallTotal = subtotal + vatAmounts;
  const subTotals = subtotal - vatAmounts;

  printWindow.document.write('</tbody></table>');
  
  printWindow.document.write(`<p>VAT Amount: ${vatAmounts}</p>`);
  printWindow.document.write(`<p>Subtotal: ${subTotals}</p>`);
  printWindow.document.write(`<p>Overall Total: ${subtotal}</p>`);
}

printWindow.document.write('</body></html>');
};

  const componentRef = useRef(null);

  // Use the hook to enable printing
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
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
           
              {data ? (
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

                        {order.cart.map((cartItem, key) => (
                          
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

                   

                    <div className="form-group row">
                      <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Select Payment</label>
                      <div className="col-sm-9">
                        <select className="form-control" onChange={handlePays} value={payments} required>
                          <option value="">Select Payment</option>
                          {payment.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline-primary" onClick={(e) => handleMakePayment(order._id, order)}>Pay Now</button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
                    </div>

                  </div>

                ))
              ) : (
                <p>No data</p>
              )
              }
            </div>

          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>
  )
}

export default RunningPaymentModal;