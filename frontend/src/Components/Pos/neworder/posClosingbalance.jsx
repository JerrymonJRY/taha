import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link,useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DataTable from "react-data-table-component";

import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';


const PosClosingBalance = ({ isModalClosingBalance, setModalClosingBalance }) => {

  const navigate  = useNavigate();
  const { id } = useParams();
  const [addedby, setuserid] = useState("");
  const [shiftstoken, setShiftstoken] = useState('');
  const [posclosebalance, setPosCloseBalance] = useState([]);

  useEffect(() => {
    const storeid = localStorage.getItem("_id");
    const storetoken = localStorage.getItem('shifttoken');
    setuserid(storeid);
    setShiftstoken(storetoken)
  }, []);

  // useEffect(() => {

  //   axios.get(`${apiConfig.baseURL}/api/pos/closingBalance?shiftstoken=${encodeURIComponent(shiftstoken)}`)
  //  // axios.fetch(`${apiConfig.baseURL}/api/pos/closingBalance?shiftstoken=${encodeURIComponent(shiftstoken)}`)
     
  //     .then((response) => response.json())
  //     .then((data) => setPosCloseBalance(data))
  //    .catch((error) => console.error(error));
  
  // }, []);
  // console.log(posclosebalance);

  console.log(addedby);

  const handleCloseBalance = () => {
    setModalClosingBalance(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/api/pos/closingBalance`, {
          params: {
            addedby: addedby,
          },
        });
        console.log(response.data)
        setPosCloseBalance(response.data);
      } catch (error) {
        console.error('Error fetching closing balance:', error);
      }
    };
  
    fetchData();
  }, [addedby]); 

  const handleCloseShift = () => {
    Swal.fire({
      title: 'Are you sure you want to close the shift?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, close shift',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // axios.post(`${apiConfig.baseURL}/api/pos/closeShift`, { shiftstoken })
        axios.put(`${apiConfig.baseURL}/api/pos/closeShift?addedby=${encodeURIComponent(addedby)}`)
          .then((response) => response.data) 
          .then((data) => {
            // Handle success
            console.log(data);
  
            // Clear localStorage and navigate
            window.localStorage.clear();
            navigate('/');
            
            Swal.fire('Shift closed!', '', 'success');
          })
          .catch((error) => {
            // Handle error
            console.error(error);
            Swal.fire('Error while closing shift', '', 'error');
          });
      } else {
        // If the user clicks "No, cancel"
        Swal.fire('Shift not closed', '', 'info');
      }
    });
  };
  




  return (
    <div>
      <div className={`modal ${isModalClosingBalance ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalClosingBalance ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: '1200px' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Pos Closing Balance</h5>
              <button type="button" className="close" onClick={handleCloseBalance}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="container">
                <div className="row">
                  {posclosebalance ? ( posclosebalance.map((order) => (
                      <>
                        <div key={order.id}>
                          <h3>Openning Balance Amount :{order.amount}</h3>

                        </div>
                        <div>
                          <ul>
                            <h3>Food Bill Amount</h3>
                            {order.payments.map((payment) => (
                              <li key={payment._id}>
                                Food Bil number {payment.bilnumber} Amount: {payment.grandTotal}
                              </li>
                            ))}
                          </ul>

                          <ul>
                            <h3>Cash Drop Amount</h3>
                            {order.cashdrops.map((drop) => (
                              <li key={drop._id}>
                                Amount: {drop.amount}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary" onClick={handleCloseShift} >Shift Close</button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setModalClosingBalance(false)}>Close</button>
                      </div>
                      </>

                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                </div>

              </div>







            </div>

          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${isModalClosingBalance ? 'show' : ''}`} style={{ display: isModalClosingBalance ? 'block' : 'none' }}></div>
    </div>
  );

}


export default PosClosingBalance;