import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const EditUser =() =>{

    const {id} =useParams()
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstname,setFirstName] =useState('');
  const [lastname,setLastName] =useState('');
  const [email,setEmail] =useState('');
  const [mobile,setMobile] =useState('');
  const [userrole,setUserRole] =useState('');

    
  const navigate = useNavigate();

  const UserRoles  = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Waiter', label: 'Waiter' },

   
   
  ];

  const handleUserRole = (event) => {
    setUserRole(event.target.value);
  //  alert({svat});
   }

   
   useEffect( ()=>{

    axios.get(`${apiConfig.baseURL}/api/user/edituser/${id}`)
    .then(res => { console.log(res)
      setFirstName(res.data.firstname)
      setLastName(res.data.lastname)
      setEmail(res.data.email)
      setMobile(res.data.mobile)
      setUserRole(res.data.userrole)
    
})
    .catch(err =>console.log(err));

},[])

   const handleSubmit =(event) =>{

    event.preventDefault();

    var formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("userrole", userrole);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(formData);

    axios
    .put(
      `${apiConfig.baseURL}/api/user/updateuser/${id}`,
      formData,
      config
    )

    .then((res) => {
      console.log(res);
      navigate("/viewuser");
    })
    .catch((err) => console.log(err));

   }


    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit User </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">User</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit User</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="firstname" value={firstname} onChange={(e)=>setFirstName(e.target.value)} id="exampleInputUsername2" placeholder="" />
                        
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)} id="exampleInputUsername2"  placeholder="" />

                        </div>
                      </div>


                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputUsername2"  placeholder="" />
                         
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} id="exampleInputUsername2"  placeholder="" />
                         
                        </div>
                      </div>

                    


        

<div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">User Roles</label>
                        <div className="col-sm-9">
                        <select name="beverage" className="form-control"     value={userrole}>
                        <option value="">Select User Role</option>
      {UserRoles.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  
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

export default EditUser;