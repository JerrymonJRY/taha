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
const DeliveryReport = () => {
  const [data, setData] = useState([]);
  const [deliveryperson, setDeliveryPerson] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deliveryNameFilter, setDeliveryNameFilter] = useState(null);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [overallGrandTotal, setOverallGrandTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/deliveryreports`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        calculateOverallGrandTotal(res.data);

        
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/reports/deliveryperson`)
      .then((response) => {
        setDeliveryPerson(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = deliveryperson.map((delivery) => ({
    value: delivery._id,
    label: delivery.dliveryname,
  }));

  const columns = [
    { name: "SI No", selector: "siNo", sortable: true },
    { name: "Order Number", selector: "ordernumber", sortable: true },
    {
      name: "Delivery Name",
      selector: (row) => (
        <React.Fragment key={row._id}>
          {row.deliveryInfo.map((delivery) => (
            <div key={delivery._id}>{delivery.dliveryname}</div>
          ))}
        </React.Fragment>
      ),
      sortable: true,
    },
    {
      name: "Delivery Mobile",
      selector: (row) => (
        <React.Fragment key={row._id}>
          {row.deliveryInfo.map((delivery) => (
            <div key={delivery._id}>{delivery.deliverymobile}</div>
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
    { name: "Grand Total", selector: "grandTotal", sortable: true },
   
  ];

  const filteredDatas = data.map((order, index) => ({
    ...order,
    siNo: index + 1,
  }));

  const handleSearch = () => {

    setIsLoading(true);

    setIsLoading(true);

    const formattedStartDate = startDateFilter ? startDateFilter.toISOString().split('T')[0] : '';
    const formattedEndDate = endDateFilter ? endDateFilter.toISOString().split('T')[0] : '';
    const deliveryId = deliveryNameFilter ? deliveryNameFilter.value : '';

    fetch(`${apiConfig.baseURL}/api/reports/deliveryreports?startDateFilter=${formattedStartDate}&endDateFilter=${formattedEndDate}&deliveryId=${deliveryId}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setIsSearchApplied(true); // Set search criteria flag
      calculateOverallGrandTotal(data);
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));

  };

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
                  <h4 className="card-title">Delivery Boy List</h4>
                 

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
                  <div className='row'>
                    <DataTable
      columns={columns}
      data={filteredDatas}
      pagination
      
    />
    
<div style={{ textAlign: "right", marginTop: "10px" }}>
            <strong>Overall Grand Total: {overallGrandTotal}</strong>
          </div>
                    </div>

                  {/* <table className="table table-hover" id="example_table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Delivery Name</th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((order) => (
                        <tr key={order._id}>
                          <td>{order.ordernumber}</td>
                          {order.deliveryInfo.map((delivery) => (
                            <React.Fragment key={delivery._id}>
                              <td>{delivery.dliveryname}</td>
                              <td>{delivery.deliverymobile}</td>
                            </React.Fragment>
                          ))}
                       <td>{formatDate(order.date)}</td>
                          <td>{order.grandTotal}</td>
                          <td>
                            <Link to={`/editSupplier/${order._id}`} className="btn btn-primary">
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4">Initial Grand Total</td>
                        <td>{filteredGrandTotal}</td>
                        <td></td>
                      </tr>
                     
                    </tfoot>
                  </table> */}
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

export default DeliveryReport;
