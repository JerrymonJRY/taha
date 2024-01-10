import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Swal from 'sweetalert2';
const EditExpense =() =>{

    const {id} =useParams()
    const [addedby, setuserid] = useState('');

    useEffect(() => {

        const storeid = localStorage.getItem('_id');
        setuserid(storeid);
          }, []);
const [expensename,setExpensename] =useState('');
const navigate = useNavigate();

useEffect( ()=>{

    axios.get(`${apiConfig.baseURL}/api/expense/expenseedit/${id}`)
    .then(res => { console.log(res)
        setExpensename(res.data.expensename)
        
    
})
    .catch(err =>console.log(err));

},[])


    const handleSubmit =(e) =>{
        e.preventDefault();
    
        var formData = new FormData();
        formData.append('expensename', expensename);
        formData.append('addedby', addedby);
        
    
        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
          };

          console.log(formData);
    
          axios
          .put(`${apiConfig.baseURL}/api/expense/updateexpense/${id}`, formData, config)
           .then(res => {
              console.log(res);
             
              navigate("/viewExpense");
            })
            .catch(err => console.log(err));
      
    
       }
    




    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit Expense </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit Expense</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit} >
                        <div className="row">
                          
                            <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Expense Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="expensename" id="exampleInputUsername2" value={expensename} onChange={(e) => {setExpensename(e.target.value)}} placeholder="Expense Name" />
                        
                        </div>
                      </div>

                    
                      
                    
                           
                      
                        </div>
                   
                      <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                     
                    </form>
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

export default EditExpense;