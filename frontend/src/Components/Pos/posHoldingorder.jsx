import React from "react";
import { useState,useEffect,useRef,forwardRef  } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactToPrint   from "react-to-print";
import ModalContent from "./modalContent";
import apiConfig from '../layouts/base_url';


const PosHoldingOrder =() =>
{

    const [posHoldingorder, setPosHoldingorder] = useState([]);
    const [kotdata,setkotData] =useState(null);
    const [showkotModal,setShowKotModal] =useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const componentRef = useRef();
    useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/gethold`)
          .then((response) => response.json())
          .then((data) => setPosHoldingorder(data))
          .catch((error) => console.error(error));
      }, []);


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

const filteredOrders = posHoldingorder.filter((order) => {
  const searchTermLower = searchTerm.toLowerCase();
  const orderNumberIncludes = order.ordernumber.toLowerCase().includes(searchTermLower);
  const tableNameIncludes = order.table && order.table.tablename.toLowerCase().includes(searchTermLower);
  const waiterNameIncludes = order.waiter.waitername.toLowerCase().includes(searchTermLower);

  return orderNumberIncludes || (tableNameIncludes && waiterNameIncludes);
});

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

  
    return(
        <>
      
        <div className="container">
               <div className="row">

                <div className="col-md-12">
                  <div className="form-group">
                  <input
                   type="text"
                   placeholder="Search by OrderID"
                   value={searchTerm}
                     onChange={handleSearch}
                    className="form-control"
        />
                  </div>
                </div>


        {
                filteredOrders.map((order) => (
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
             <a class="btn btn-outline-primary" href="#">Edit</a>
   
         </div>
    </div>
                </div>
                </div>
            </div>

))
}
        
        </div>


         {/* Setkot Table */}
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
            
              <ModalContent kotdata={kotdata} ref={componentRef} />
      
            </div>

            <div class="modal-footer">
            <ReactToPrint
  trigger={() => (
    <button className="btn btn-outline-primary">Print</button>
  )}
  content={() => componentRef.current}
/>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
      </div>
         
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
    </div>
    </div>
        </>
    );
}

export default PosHoldingOrder;