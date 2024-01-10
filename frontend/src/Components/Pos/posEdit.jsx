import React from "react";
import { useState,useEffect } from "react";


import {useNavigate,Link } from "react-router-dom";

import PosNewOrder from "./posNeworder";

import { FaShoppingCart, FaHistory, FaPause,FaRegCalendarAlt    } from 'react-icons/fa';
import { MdBookOnline } from "react-icons/md";
import { IoMdToday } from "react-icons/io";
import PosOrderEdit from "./neworder/posOrderEdit";
const PosEdit =() =>{




      const [activeTab, setActiveTab] = useState('neworder');

      const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };
      const imageName = "burps.png";
    return (
     
            <div className="container-fluid">
                    <div className="division">
                    <div className="row">
                        <div className="col-md-2">
                        <div className="w-100 d-inline-block text-center pb-4"> <Link to="/dashboard" ><img src={`/assets/images/pos/${imageName}`} className="img-fluid" alt="Burps Logo" /></Link> </div>
                        </div>
                        <div className="col-md-10 main-content">
            <div className="menumain">
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className="nav-item ">
                 
                  <Link className="nav-link active"  data-toggle="tab"
                   to="/pos"
                    role="tab"
                    aria-controls="neworder" ><FaShoppingCart className="mr-1" /> New Order</Link>
                </li>
                <li className="nav-item">

                 
                    <Link className="nav-link "  data-toggle="tab"
                   to="/runningorder"
                    role="tab"
                    aria-controls="neworder" ><FaHistory className="mr-2" />Running Order</Link>
                </li>
               
                
                <li className="nav-item">
              
                    <Link className="nav-link "  data-toggle="tab"
                   to="/onlineorder"
                    role="tab"
                    aria-controls="neworder" ><MdBookOnline  className="mr-1" /> Online Order</Link>
                </li>
                <li className="nav-item">
               
                   <Link className="nav-link "  data-toggle="tab"
                   to="/deliverysession"
                    role="tab"
                    aria-controls="neworder" >  <FaRegCalendarAlt className="mr-2" />  Delivery Settlment</Link>
                </li>
                <li className="nav-item">
               
                   <Link className="nav-link "  data-toggle="tab"
                   to="/settlementreport"
                    role="tab"
                    aria-controls="neworder" >  <IoMdToday  className="mr-2" /> Settlment Report</Link>
                </li>
             
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === 'neworder' ? 'active' : ''}`} id="neworder" role="tabpanel" aria-labelledby="neworder-tab">
            <PosOrderEdit />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PosEdit;