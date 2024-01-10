import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';

import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';

const ViewFoodMenu =() =>{

  const [foodmenus, setFoodmenu] = useState([]);



  useEffect( ()=>{

    axios.get(`${apiConfig.baseURL}/api/foodmenu/getallfoodmenu`)
    .then((res) => {
      setFoodmenu(res.data);

      // Initialize DataTables after data is loaded
      $(document).ready(function () {
        $('#example_table').DataTable();
      });
    })
    .catch((err) => console.log(err));
}, []);


  const handleDelete =(id) =>
  {
  }

  const handleExportCsv = async () => {
    try {
      // Make a request to the server to generate and send the CSV file
      const response = await axios.get(`${apiConfig.baseURL}/api/foodmenu/exportfoodmenu`, {
        responseType: 'blob', // Set the responseType to 'blob' for binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'foodmenu.csv';
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      // Handle the error as needed
    }
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
                    <h4 className="card-title">Food Menu List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addfoodmenu" className="btn btn-success">
  Add +
</Link>{' '}
&nbsp;
<button onClick={handleExportCsv} className="btn btn-success">
  Export Foodmenu Csv
</button> {' '}
&nbsp;
<Link to="/importfoodmenu" className="btn btn-success">
  Import Foodmenu Csv
</Link>
                </div>
                  
                <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Food Name</th>
                          <th>Food Category</th>
                        <th>Sales Price</th>
                        <th>Vat</th>
                        <th>Photo</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                   <tbody>
                   {
                        foodmenus.map((order) => (

                            <tr >
                                <td>
                                    {order.foodmenuname}
                                </td>
                                <td>
                                    {order.foodcategory.foodcategoryname}
                                </td>
                                <td>
                                    {order.salesprice}
                                </td>
                                <td>
                                    {order.vat.vatname}
                                </td>
                                <td>
                                    {order.image}
                                </td>


                              
                               
                                <td>
                                <Link to={`/editfoodmenu/${order._id}`} className="btn btn-primary">Edit</Link>
                                    <button onClick={  (e)=>handleDelete(order._id)} className="btn btn-danger">Delete</button>
                                </td>

                            </tr>

                        ))
                    }
                   </tbody>
                    </table>
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

export default ViewFoodMenu;