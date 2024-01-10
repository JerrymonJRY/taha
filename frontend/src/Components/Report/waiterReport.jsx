import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from 'axios';
import apiConfig from '../layouts/base_url';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import DataTable from "react-data-table-component";

const WaiterReport = () => {
  const [data, setData] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deliveryNameFilter, setDeliveryNameFilter] = useState(null);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [overallGrandTotal, setOverallGrandTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/waiterreports`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        calculateOverallGrandTotal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/getwaiter`)
      .then((response) => {
        setWaiter(response.data);
      
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = waiter.map((delivery) => ({
    value: delivery._id,
    label: delivery.waitername,
  }));

  const handleSearch = () => {

    setIsLoading(true);

    setIsLoading(true);

    const formattedStartDate = startDateFilter ? startDateFilter.toISOString().split('T')[0] : '';
    const formattedEndDate = endDateFilter ? endDateFilter.toISOString().split('T')[0] : '';
    const waiterId = deliveryNameFilter ? deliveryNameFilter.value : '';

    fetch(`${apiConfig.baseURL}/api/reports/waiterreports?startDateFilter=${formattedStartDate}&endDateFilter=${formattedEndDate}&waiterId=${waiterId}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setIsSearchApplied(true); // Set search criteria flag
      calculateOverallGrandTotal(data);
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
  };
    
  

  const columns = [
    { name: "SI No", selector: "siNo", sortable: true },
    { name: "Order Number", selector: "ordernumber", sortable: true },
    // { name: "Waiter", selector: "waiterInfo.waitername", sortable: true },
    {
      name: "Waiter Name",
      selector: (row) => (
        <React.Fragment key={row._id}>
          {row.waiterInfo.map((waiter) => (
            <div key={waiter._id}>{waiter.waitername}</div>
          ))}
        </React.Fragment>
      ),
      sortable: true,
    },
    {
        name: "Date",
        selector: "date",
        sortable: true,
        cell: (row) => new Date(row.date).toLocaleDateString(),
      },
    { name: "Total", selector: "total", sortable: true },
    { name: "Vat Amount", selector: "vatAmount", sortable: true },
  
    { name: "Grand Total", selector: "grandTotal", sortable: true },
  ];

  const filteredDatas = data.map((order, index) => ({
    ...order,
    siNo: index + 1,
  }));

  const calculateOverallGrandTotal = (filteredData) => {
    const grandTotal = filteredData.reduce(
      (total, order) => total + parseFloat(order.grandTotal || 0),
      0
    );
    
    setOverallGrandTotal(isNaN(grandTotal) ? 0 : grandTotal.toFixed(0)); // Format the grand total as an integer
  };

 

 
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Waiter List</h4>
                  

                  <div className="row">
                    <div className="col-md-3">
                      <Select
                        options={options}
                        value={deliveryNameFilter}
                        onChange={(selectedOption) => setDeliveryNameFilter(selectedOption)}
                      />
                    </div>

                    <div className="col-md-3">
                      <DatePicker
                        selected={startDateFilter}
                        className="form-control"
                        placeholderText="Start Date"
                        onChange={(date) => setStartDateFilter(date)}
                      />
                    </div>

                    <div className="col-md-3">
                      <DatePicker
                        selected={endDateFilter}
                        className="form-control"
                        placeholderText="End Date"
                        onChange={(date) => setEndDateFilter(date)}
                      />
                    </div>

                    <div className="col-md-3">
                      <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="row"> 
 <DataTable
         
          columns={columns}
          data={filteredDatas}
          pagination
       
        />

<div style={{ textAlign: "right", marginTop: "10px" }}>
            <strong>Overall Grand Total: {overallGrandTotal}</strong>
          </div>
 </div>

                 
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WaiterReport;