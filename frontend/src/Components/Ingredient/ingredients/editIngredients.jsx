import React from "react";
import { useState,useEffect } from "react";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import apiConfig from '../../layouts/base_url';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";


const EditIngredients =() =>{

    const {id} =useParams()
    const [categories, setCategories] = useState([]);
    const [categoryId, setSelectedCategory] = useState('');




    
    useEffect( ()=>{

        axios.get(`${apiConfig.baseURL}/api/ingredient/getingredient/${id}`)
        .then(res => { console.log(res)
            setName(res.data.name)
            setSelectedCategory(res.data.categoryId)
            setSelectedUnit(res.data.unitId)
            setPurchaseprice(res.data.purchaseprice)
            setAlertquantity(res.data.alertquantity)
            setDescription(res.data.description)
        
    })
        .catch(err =>console.log(err));

    },[])

   

  useEffect(() => {
    // Fetch categories from the server
    axios.get(`${apiConfig.baseURL}/api/ingredient/getallcategory`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const [units, setUnits] = useState([]);
  const [unitId, setSelectedUnit] = useState('');

 
  useEffect(() => {
    // Fetch categories from the server
    axios.get(`${apiConfig.baseURL}/api/ingredient/getingunit`)
      .then((response) => {
        setUnits(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };




  const [name,setName] =useState('');
  const [purchaseprice,setPurchaseprice] =useState('');
  const [alertquantity,setAlertquantity] =useState('');
  const [description,setDescription] =useState('');
 
     const navigate = useNavigate();
    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put(`${apiConfig.baseURL}/api/ingredient/updateingredient/${id}`,{ name,categoryId,unitId ,purchaseprice,alertquantity,description })
        .then(res =>{

            console.log(res);
            navigate('/viewingredients');
        })
        .catch(err =>console.log(err));
    }
    return (
        <div class="container-scroller">
        <Header />
        <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Food Ingredients </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Food Category</li>
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
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food Intgredients Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="name" value={name} id="exampleInputUsername2" onChange={(e) => {setName(e.target.value)}} placeholder="Food Intgredients Name" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food Category</label>
                        <div className="col-sm-9">
                        <select name="category" className="form-control" onChange={handleCategoryChange}  value={categoryId}>
                             <option value="">Select Category</option>
                                 {categories.map((category) => (
                                  <option key={category._id} value={category._id}>
                                      {category.categoryname}
                                   </option>
                                 ))}
                        </select>
                        </div>
                      </div>


                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Food ingredient Unit</label>
                        <div className="col-sm-9">
                        <select name="category" className="form-control" onChange={handleUnitChange} value={unitId}>
                           <option value="">Select Food Ingredient Unit</option>
                              {units.map((unit) => (
                                 <option key={unit._id} value={unit._id}>
                                   {unit.unitname}
                                 </option>
                                 ))}
                         </select>
                        </div>
                      </div>

                 

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Purchase Price</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={purchaseprice} name="purchaseprice" id="exampleInputUsername2" onChange={(e) => {setPurchaseprice(e.target.value)}} placeholder="Purchase Price" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Alert Quantity/Amount</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={alertquantity} name="alertquantity" id="exampleInputUsername2" onChange={(e) => {setAlertquantity(e.target.value)}} placeholder="Alert Quantity/Amount" />
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={description} name="description" id="exampleInputUsername2" onChange={(e) => {setDescription(e.target.value)}} placeholder="Food Description" />
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

export default EditIngredients;