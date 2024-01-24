import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from 'axios'
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';

//import jwtDecode from 'jwt-decode';
const Dashboard =() =>{

  const navigate =useNavigate();
  const signOut = () => {
    localStorage.removeItem('token')
    navigate("/");
}
const cardBodyStyle = {
  padding: '0',
  // Add more styles for card body as needed
};

const [todayordercount, setTodayorderCount] = useState(0);
const [totalordercount, setTotalorderCount] = useState(0);
const [todaynotpaidcount,setNotpaidCount] =useState(0);
const [toddaypaid, setTodaypaid] = useState([]);

useEffect(() => {
 fetch(`${apiConfig.baseURL}/api/dashboard/todayorder`)
    .then((response) => response.json())
    .then((data) => setTodayorderCount(data.count))
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  fetch(`${apiConfig.baseURL}/api/dashboard/totalorder`)
     .then((response) => response.json())
     .then((data) => setTotalorderCount(data.count))
     .catch((error) => console.error(error));
 }, []);

 useEffect(() => {
  axios
    .get(`${apiConfig.baseURL}/api/pos/paidorders`)
    .then((res) => {
      setTodaypaid(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const calculateOverallTotal = (orders) => {
  return orders.reduce((total, order) => {
    const paymentTotal = parseFloat(order.grandTotal) || 0;
    return total + paymentTotal;
  }, 0);
};

console.log(todaynotpaidcount);

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-home"></i>
                </span> Dashboard
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white" >
                  <div className="card-body" >
                    <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Today Orders <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{ todayordercount }</h2>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-3 stretch-card grid-margin">
  <div className="card bg-gradient-info card-img-holder text-white">
    <div className="card-body">
      <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
      <h4 className="font-weight-normal mb-3">
        Today Sales <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
      </h4>

      {toddaypaid.length > 0 ? (
        <>
          {toddaypaid.map((order) => (
            <React.Fragment key={order.id}>
              {/* Render additional content for each order if needed */}
              <p>{order.someAdditionalInfo}</p>
            </React.Fragment>
          ))}
          <h2 className="mb-5">{calculateOverallTotal(toddaypaid)}</h2>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  </div>
</div>



              <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                  <div className="card-body">
                    <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Total Orders <i className="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{totalordercount}</h2>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-3 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                  <div className="card-body">
                    <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                    <h4 className="font-weight-normal mb-3">Total Sales  <i className="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">95,5741</h2>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="clearfix">
                      <h4 className="card-title float-left">Visit And Sales Statistics</h4>
                      <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right"></div>
                    </div>
                    <canvas id="visit-sale-chart" className="mt-4"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-md-5 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Traffic Sources</h4>
                    <canvas id="traffic-chart"></canvas>
                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4"></div>
                  </div>
                </div>
              </div>
            </div>

           

          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default Dashboard;
