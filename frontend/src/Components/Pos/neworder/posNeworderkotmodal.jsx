import React from "react";
import { useState, useEffect,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';
import PosNewKotmodal from "./posNeworderkotlist";
const PosNeworderKotModal =({isModalOpen,setModalOpen}) =>
{
   // const [isModalOpen, setModalOpen] = useState(false);
  const [posRunningorder, setPosRunningorder] = useState([]);
  const [searchKotTerm, setSearchKotTerm] = useState('');

  const [kotdata,setkotData] =useState(null);
  const [showkotModal,setShowKotModal] =useState(false);
    const handleCloseModal = () => {
        setModalOpen(false);
      };
      useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/getrunningorder`)
          .then((response) => response.json())
          .then((data) => setPosRunningorder(data))
          .catch((error) => console.error(error));
      }, [])

      const handleKotSearch = (e) => {
        setSearchKotTerm(e.target.value);
      };
      
    
      const filteredOrders = posRunningorder.filter((order) => {
        const searchTermLower = searchKotTerm.toLowerCase();
        const orderNumberIncludes = order.ordernumber.toLowerCase().includes(searchTermLower);
        const tableNameIncludes = order.table && order.table.tablename.toLowerCase().includes(searchTermLower);
        const waiterNameIncludes = order.waiter.waitername.toLowerCase().includes(searchTermLower);
      
        return orderNumberIncludes || (tableNameIncludes && waiterNameIncludes);
      });

      
  const handlekot =(id) =>
  {
  
  
    axios.get(`${apiConfig.baseURL}/api/pos/getKot/${id}`)
    .then((response) => {
      setkotData(response.data);
      console.log(response.data);
      setShowKotModal(true);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  
  }
    
    return (

        <div>
        <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Kot Details</h5>
                     <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
                   </div>
                   <div className="modal-body">
                   <div className="row">

<div className="col-md-12">
 <div className="form-group">
 <input
   type="text"
   placeholder="Search by OrderID"
   value={searchKotTerm}
   onChange={handleKotSearch}
   className="form-control"
 />
 </div>
</div>
 

{
  filteredOrders.map((order) => (
    <div key={order._id} className="col-md-3">
      <div className="menu-boxs">
        <div className="menu-div">
          <h5 className="text-center">OrderID: <span>{order.ordernumber}</span></h5>
          <h6 className="text-center">Table: {order.table ? order.table.tablename : 'No Table'}</h6>
          <h6 className="text-center">Waiter: {order.waiter.waitername}</h6>
          <h6 className="text-center">Running order</h6>

          <div className="row">
            <div className="d-inline mx-auto">
              <a className="btn btn-outline-primary" onClick={(e) => handlekot(order._id)} href="#">
                Print
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
 
 </div>
                     
       
                   </div>
                
                 </div>
               </div>
             </div>
            
             <div className={`modal-backdrop ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}></div>
         <PosNewKotmodal kotdata={kotdata} showkotModal={showkotModal} setShowKotModal={setShowKotModal}  />
           </div>
    )
}

export default PosNeworderKotModal;