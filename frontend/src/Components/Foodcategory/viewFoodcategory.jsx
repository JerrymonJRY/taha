import React from 'react'
import { useState ,useEffect} from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const ViewFoodCategory =() =>{


    
  const [data , setData] =useState([]);
  const navigate = useNavigate();
  useEffect( ()=>{

      axios.get(`${apiConfig.baseURL}/api/foodcategory/allfoodcategory`)
      .then((res) => {
        setData(res.data);

        // Initialize DataTables after data is loaded
        $(document).ready(function () {
          $('#example_table').DataTable();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete =(id) =>
  {
      const confirm =window.confirm('Are You Delete');
      if(confirm)
      {
          axios.delete(`${apiConfig.baseURL}/api/foodcategory/deletefoodCategory/${id}`)
          .then(res =>{

             
              navigate('/viewfoodcategory');
              console.log(res);
          }).catch(err =>console.log(err));
      }
  }

  const handleExportCsv = async () => {
    try {
      // Make a request to the server to generate and send the CSV file
      const response = await axios.get(`${apiConfig.baseURL}/api/foodcategory/exportfoodcategory`, {
        responseType: 'blob', // Set the responseType to 'blob' for binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'foodcategory.csv';
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
                    <h4 className="card-title">Food Category</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addfoodcategory" className="btn btn-success">Add +</Link>
                    {' '}
&nbsp;
<button onClick={handleExportCsv} className="btn btn-success">
  Export FoodCategory Csv
</button> {' '}
&nbsp;
<Link to="/importfoodcategory" className="btn btn-success">
  Import FoodCategory Csv
</Link>
                </div>
                  
                <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Food Category Name</th>
                          <th>Description</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.foodcategoryname}
                                </td>
                                <td>
                                    {d.description}
                                </td>
                               
                                <td>
                                <Link to={`/editfoodcategory/${d._id}`} className="btn btn-primary">Edit</Link>
                                    <button onClick={  (e)=>handleDelete(d._id)} className="btn btn-danger">Delete</button>
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

export default ViewFoodCategory;