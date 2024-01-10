import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Sidebar =() =>{
  const faceimage ="face1.jpg"
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
            <img src={`/assets/images/faces/${faceimage}`}  alt="profile" />
             
              <span className="login-status online"></span>
            
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">David Grey. H</span>
              <span className="text-secondary text-small">Project Manager</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li className="nav-item">
      
          <Link className="nav-link" to="/dashboard"> <span className="menu-title">Dashboard</span> <i className="mdi mdi-home menu-icon"></i></Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <span className="menu-title">Food Category</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
           
            <li className="nav-item"> <Link className=" nav-link" to="/addfoodcategory"> Add Food Category</Link> </li>
              <li className="nav-item"> <Link className=" nav-link" to="/viewfoodcategory"> View Food Category</Link></li>
            </ul>
          </div>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-ingred" aria-expanded="false" aria-controls="ui-ingred">
            <span className="menu-title">Purchase</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-contacts menu-icon"></i>
          </a>
          <div className="collapse" id="ui-ingred">
            <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <Link className=" nav-link" to="/addingredient"> Add Food Ingredient</Link> </li>
              <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">View Ingredient </a></li>
            </ul>
          </div>
        </li> */}
   
        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
              <span className="menu-title">Employee</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </a>
            <div className="collapse" id="general-pages">
              <ul className="nav flex-column sub-menu">
              {/* <li className="nav-item"> <a className="nav-link" href="">Designation </a></li> */}
              <li className="nav-item"> <Link className="nav-link" to="/viewWaiter"> Waiter</Link> </li>
              <li className="nav-item"> <Link className="nav-link" to="/viewDelivery">Delivery</Link> </li>
              
              </ul>
            </div>
          </li>



        <li className="nav-item">
        <Link className="nav-link" to="/pos"> <span className="menu-title">POS</span> <i className="mdi mdi-contacts menu-icon"></i></Link>
       
        </li>

        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#general-orders" aria-expanded="false" aria-controls="general-pages">
              <span className="menu-title">Orders</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </a>
            <div className="collapse" id="general-orders">
              <ul className="nav flex-column sub-menu">
              {/* <li className="nav-item"> <a className="nav-link" href="">Designation </a></li> */}
              <li className="nav-item"> <Link className="nav-link" to="/posorder"> Pos Order</Link> </li>
              
              </ul>
            </div>
          </li>


        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-master" aria-expanded="false" aria-controls="ui-master">
            <span className="menu-title">Master</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-contacts menu-icon"></i>
          </a>
          <div className="collapse" id="ui-master">
            <ul className="nav flex-column sub-menu">
               <li className="nav-item"> <Link className=" nav-link" to="/viewCustomer"> Customer</Link></li>
               <li className="nav-item"> <Link className=" nav-link" to="/viewDesignation">Designation</Link></li>
               <li className="nav-item"> <Link className=" nav-link" to="/viewExpense">Expense Category</Link></li>
               <li className="nav-item"> <Link className=" nav-link" to="/viewfoodcategory"> Food Category</Link></li>
               <li className="nav-item"> <Link className=" nav-link" to="/viewfoodmenu"> Food Menu</Link></li>
               <li className="nav-item"><Link className=" nav-link" to="/viewingredientfoodcategory"> Ingredient Category</Link>  </li>
              <li className="nav-item"> <Link className=" nav-link" to="/viewingredientunit"> Ingredient Unit</Link></li>
              <li className="nav-item"> <Link className=" nav-link" to="/viewingredients"> Ingredients</Link></li>
              <li className="nav-item"><Link className=" nav-link" to="/viewTable"> Table</Link> </li>
              <li className="nav-item"><Link className=" nav-link" to="/viewVat"> Vat</Link> </li>
              
              
             

            </ul>
          </div>
        </li>

        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#general-inventory" aria-expanded="false" aria-controls="general-inventory">
              <span className="menu-title">Inventory</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </a>
            <div className="collapse" id="general-inventory">
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className="nav-link" to="/viewSupplier"> Supplier</Link></li>
              <li className="nav-item"> <Link className="nav-link" to="/viewPurchase"> Purchase</Link></li>
              {/* <li className="nav-item"> <Link className="nav-link" to="/viewWaiter"> Waiter</Link> </li> */}
              
              </ul>
            </div>
          </li>
   
        <li className="nav-item">
        
          <Link className="nav-link" to="/viewExpenseinvoice"> <span className="menu-title">Expense</span>  <i className="mdi mdi-format-list-bulleted menu-icon"></i></Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#general-reports" aria-expanded="false" aria-controls="general-inventory">
              <span className="menu-title">Reports</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </a>
            <div className="collapse" id="general-reports">
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className="nav-link" to="/dailveryReport"> Delivery Report</Link></li>
              <li className="nav-item"> <Link className="nav-link" to="/customerReport"> Customer Report</Link></li>
              <li className="nav-item"> <Link className="nav-link" to="/waiterReport"> Waiter Report</Link> </li>
              
              </ul>
            </div>
          </li>
        {/*  <li className="nav-item">
          <a className="nav-link" href="pages/tables/basic-table.html">
            <span className="menu-title">Tables</span>
            <i className="mdi mdi-table-large menu-icon"></i>
          </a>
        </li> */}

      </ul>
    </nav>
    );
}

export default Sidebar;