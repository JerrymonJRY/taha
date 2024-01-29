import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from 'axios'
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Chart from 'chart.js/auto';
import DashboardGraph from './dashboardGraph';

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
const [todaypaidcount,setpaidCount] =useState(0);
const [totalpaidamount,setTotalpaidamount] =useState(0);


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
  fetch(`${apiConfig.baseURL}/api/dashboard/todaypaidsales`)
    .then((response) => response.json())
    .then((data) => setpaidCount(data.sum))
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  fetch(`${apiConfig.baseURL}/api/dashboard/oveallsales`)
    .then((response) => response.json())
    .then((data) => setTotalpaidamount(data.sum))
    .catch((error) => console.error(error));
}, []);







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
                    <h4 className="font-weight-normal mb-3">Today Sales <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{todaypaidcount}</h2>
                   
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
                    <h2 className="mb-5">{totalpaidamount}</h2>
                   
                  </div>
                </div>
              </div>
            </div>
         <DashboardGraph />

           

          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default Dashboard;
