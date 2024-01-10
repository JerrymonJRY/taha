import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
const RunningPaymentModal = ({ data, showModal, setShowModal }) => {

  const navigate = useNavigate();

  const [payments, setPays] = useState();
  const [processedIds, setProcessedIds] = useState([]);
  const [addedby, setuserid] = useState("");
  const [shiftstoken, setShiftstoken] = useState('');
  const imageName = "taha.png";

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

    //  alert({svat});
  }


  const handleMakePayment = (id, order) => {

    if (!order || order?.grandTotal == null) {
      // Handle the case where order is null or grandTotal is not available
      console.error("Invalid order data");
      return;
    }

    var formData = new FormData();
    formData.append("paymentType", payments);
    formData.append("total", order.total);
    formData.append("vatAmount", order.vatAmount);
    formData.append("grandTotal", order.grandTotal);
    formData.append("addedby", addedby);
    formData.append("shiftstoken", shiftstoken);

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
            openPrintModal(res.data);
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

  function openPrintModal(data) {
    // Create a modal dialog or use a library like Swal
    Swal.fire({
      title: "Order Details",
     // html: getFormattedOrderDetails(data), // Call a function to format the data
     html: getFormattedOrderDetails(data) + '<button className="btn btn-outline-primary" id="printButton">Print</button>',
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });

    document.getElementById("printButton").addEventListener("click", () => {
      printOrderDetails(data);
    });


 
    function getFormattedOrderDetails(data) {
      // Create an HTML structure to display the order details
      let formattedDetails = `
        <div style="font-family: Arial; text-align: center;">
          <img  src="/assets/images/pos/${imageName}" alt="Logo" style="max-width: 100%; height: auto; margin-top: 10px;" />
          <p style="margin-top: 10px;"><strong>Order Number:</strong> ${data.ordernumber}</p>
         
          <p><strong>Options:</strong> ${data.options}</p>
       
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; text-align: left;">
            <thead style="border-bottom: 1px solid #000;">
              <tr><th>Item</th><th>Food Menu Name</th><th>Sales Price</th><th>Quantity</th></tr>
            </thead>
            <tbody>
      `;
    
      data.cart.forEach((item, index) => {
        formattedDetails += `
          <tr>
            <td>${index + 1}</td>
            <td className="capitalize-first-letter">${item.foodmenuname}</td>
            <td>${item.salesprice}</td>
            <td>${item.quantity}</td>
          </tr>
        `;
      });
    
      formattedDetails += `
            </tbody>
          </table>
          <p style="margin-top: 10px;"><strong>VAT Amount:</strong> ${data.vatAmount}</p>
          <p><strong>Total Amount:</strong> ${data.total}</p>
          <p><strong>Grand Total:</strong> ${data.grandTotal}</p>
        </div>
      `;
    
      return formattedDetails;
    }
    
    function printOrderDetails(data) {
      const modalContent = getFormattedOrderDetails(data);
      
      // Create a hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      
      // Write the formatted order details to the iframe
      const iframeDocument = iframe.contentWindow.document;
      iframeDocument.write('<html><head><title>Order Details</title></head><body>');
      iframeDocument.write(modalContent);
      iframeDocument.write('</body></html>');
      iframeDocument.close();
      
      // Trigger the print operation
      iframe.contentWindow.print();
      
      // Remove the iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000); // Adjust the timeout value as needed
    }



  }

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
                        <select className="form-control" onChange={handlePays} value={payments}>
                          <option>Select Payment</option>
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