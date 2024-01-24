import React from "react";
import { useState, useEffect,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DataTable from "react-data-table-component";

import Swal from 'sweetalert2';
import apiConfig from '../../layouts/base_url';


const PosInvoiceReport = ({isModalInvoiceReport,setModalInvoiceReport}) =>{

    const [posTodaydelivery, setPosTodayDelivery] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const handleCloseInvoice =() =>{
    setModalInvoiceReport(false);
  }

  useEffect(() => {
   
 
      
      fetch(`${apiConfig.baseURL}/api/pos/invoicereport`)
        .then((response) => response.json())
        .then((data) => setPosTodayDelivery(data))
        .catch((error) => console.error(error));
    
  }, []);

  const handleSearch = () => {
    setIsLoading(true);

    setIsLoading(true);

    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

    // Your existing data fetching logic
    fetch(`${apiConfig.baseURL}/api/pos/invoicereport?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
    .then((response) => response.json())
    .then((data) => {
      setPosTodayDelivery(data);
      setIsSearchApplied(true); // Set search criteria flag
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
  };

  const columns = [
    { name: "SI No", selector: "siNo", sortable: true },
    { name: "Select Option", selector: "options", sortable: true },
    { name: "Waiter", selector: "waiter.waitername", sortable: true },
    {
        name: "Date",
        selector: "date",
        sortable: true,
        cell: (row) => new Date(row.date).toLocaleDateString(),
    },
   
   
   
    { 
        name: "Subtotal", 
        selector: "subtotalAfterVat", 
        sortable: true, 
        cell: (row) => {
            const subtotal = row.total; // Assuming the 'total' property exists in your row object
            const vat = 5;
            const vatamounts = (subtotal * vat) / 100;
            return subtotal - vatamounts;
        },
    },
    { 
      name: "Vat Amount", 
      selector: "subtotalAfterVat", 
      sortable: true, 
      cell: (row) => {
          const subtotal = row.total; // Assuming the 'total' property exists in your row object
          const vat = 5;
          const vatamounts = (subtotal * vat) / 100;
          return vatamounts;
      },

     },
    { name: "Grand Total", selector: "grandTotal", sortable: true },
    { name: "Added By", selector: "user.firstname", sortable: true },
];


  const filteredData = posTodaydelivery.map((order, index) => ({
    ...order,
    siNo: index + 1,
  }));

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setIsSearchApplied(false);
    setIsLoading(true);

    fetch(`${apiConfig.baseURL}/api/pos/invoicereport`)
      .then((response) => response.json())
      .then((data) => setPosTodayDelivery(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };


    return(
        <div>
        <div className={`modal ${isModalInvoiceReport ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalInvoiceReport ? 'block' : 'none' }}>
   <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pos Invoice Report</h5>
                <button type="button" className="close" onClick={handleCloseInvoice}>
           <span>&times;</span>
         </button>
              </div>
              <div className="modal-body">
 
              <div className="container">
 <div className="row">
   {/* Add date input fields and search button here */}

   <div className="col-md-3">
   <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="form-control"
        />
   </div>

   <div className="col-md-3">
   <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="form-control"
        />
   </div>

   <div className="col-md-1">
   <button className="btn btn-gradient-primary me-2" onClick={handleSearch}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
   </div>

   <div className="col-md-1">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
   
 
  

   {/* DataTable component */}
  
 </div>
 <div className="row">
                  {/* Display selected dates */}
                  <div className="col-md-12">
                    {startDate && endDate && (
                      <p>
                        Selected Dates: {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
 <div className="row"> 
 <DataTable
         
          columns={columns}
          data={filteredData}
          pagination
        />
 </div>
</div>



   
   
                
  
              </div>
           
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${isModalInvoiceReport ? 'show' : ''}`} style={{ display: isModalInvoiceReport ? 'block' : 'none' }}></div>
   </div>
    );

}


export default PosInvoiceReport;