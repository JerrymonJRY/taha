import React from "react";
import { useState, useEffect,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';
const PosNewHoldingModal =({isModalHold,setModalHold}) =>
{
    const [posHoldingorder, setPosHoldingorder] = useState([]);
    const [holdSearchTerm, setholdSearchTerm] = useState('');
    useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/gethold`)
          .then((response) => response.json())
          .then((data) => setPosHoldingorder(data))
          .catch((error) => console.error(error));
      }, []);
    
      const filteredOrdershold = posHoldingorder.filter((order) => {
        const searchTermLower = holdSearchTerm.toLowerCase();
        const orderNumberIncludes = order.ordernumber.toLowerCase().includes(searchTermLower);
        const tableNameIncludes = order.table && order.table.tablename.toLowerCase().includes(searchTermLower);
        const waiterNameIncludes = order.waiter.waitername.toLowerCase().includes(searchTermLower);
      
        return orderNumberIncludes || (tableNameIncludes && waiterNameIncludes);
      });

      const handleCloseHold =() =>{
        setModalHold(false);
      }
      const handleHoldSearch = (e) => {
        setholdSearchTerm(e.target.value);
      };
    return (
<div>
        <div className={`modal ${isModalHold ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalHold ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Holding Order</h5>
                     <button type="button" className="close" onClick={handleCloseHold}>
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
                   value={holdSearchTerm}
                     onChange={handleHoldSearch}
                    className="form-control"
        />
                  </div>
                </div>


        {
                filteredOrdershold.map((order) => (
            <div className="col-md-3">
                  <div className="menu-boxs">
                <div className="menu-div">
                  <h5 className="text-center">OrderID:<span>{order.ordernumber}</span></h5>
               
                  <h6 className="text-center">Table:{order.table  ?order.table.tablename :'No Table'}</h6>
                  <h6 className="text-center">Table:{order.waiter.waitername}</h6>
                  <h6 className="text-center">Runningorder</h6>

                  <div class="row">
        
         <div className="d-inline mx-auto">

            
             <a class="btn btn-outline-primary" onClick={(e) => handlekot(order._id)} href="#">KOT</a>
             <Link to={`/posedit/${order._id}`} className="btn btn-outline-primary">Edit</Link>
   
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
             <div className={`modal-backdrop ${isModalHold ? 'show' : ''}`} style={{ display: isModalHold ? 'block' : 'none' }}></div>
           </div>
    )
}
export default PosNewHoldingModal;