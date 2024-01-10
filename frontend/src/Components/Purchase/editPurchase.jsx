import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import Select from 'react-select';

const EditPurchase = () => {
  const [suppliers, setSupplier] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const [selectIngredient, setSelectIngredient] = useState(null);
  const [cart, setCart] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [selectSupplier, setSelectedSupplier] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState('');
  const { id } = useParams();
  const [supplierOptions, setSupplierOptions] = useState([]);
  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/api/purchase/edit/${id}`);
        const itemData = response.data;

        if(itemData && itemData.invoiceDate)
        {
          setInvoiceDate(itemData.invoiceDate)
        }

        if (itemData && itemData.cart && Array.isArray(itemData.cart)) {
          setCart(itemData.cart);

          itemData.cart.forEach(item => {
            // console.log("Food Item: " + item.ingredientname);
            // console.log("Quantity: " + item.quantity);
            // console.log("Sales Price: " + item.expirydate);
            // console.log("Sales Price: " + item.total);
            // console.log("--------------");
          });
        } else {
          console.log("Cart data is not available or is in an unexpected format.");
        }

        if(itemData && itemData.paidAmount)
        {
          setPaidAmount(itemData.paidAmount);
        }

        if (itemData && itemData.supplierId && Array.isArray(itemData.supplierId)) {
          setSupplier(itemData.supplierId);

          const options = response.data.map(supplier => ({
            value: supplier._id,
            label: supplier.suppliername,
          }));
        } else {
          console.log("Supplier data is not available or is in an unexpected format.");
        }
       
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPurchaseData();
  }, [id]);

  useEffect(() => {
    // Fetch categories from the server
    axios.get(`${apiConfig.baseURL}/api/purchase/getSupplier`)
      .then((response) => {
        setSupplier(response.data);


        const supplierOptions = response.data.map(supplier => ({
          value: supplier._id,
          label: supplier.suppliername,
        }));

        // Set the supplier options
        setSupplierOptions(supplierOptions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch categories from the server
    axios.get(`${apiConfig.baseURL}/api/purchase/getIngredient`)
      .then((response) => {
        setIngredient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = suppliers.map(supplier => ({
    value: supplier._id,
    label: supplier.suppliername,
  }));


  const ingredient = ingredients.map(ingredients => ({
    value: ingredients._id,
    label: ingredients.name,
    ingredientname: ingredients.name,
    purchaseprice: ingredients.purchaseprice,
    unit: ingredients.ingredientunit.unitname
  }));

  const addProductToCart = async (ingredient) => {
    console.log(ingredient);
   // let findProductInCart = cart.find(i => i.ingredientId === ingredient._id);
   // let newCart = [];
    //console.log(findProductInCart);
  };

  const handleIngredient = (selectedOption) => {
    setSelectIngredient(selectedOption);

    if (selectedOption) {
     
      const existingIngredient = cart.find((item) => item.ingredientId === selectedOption.value || item.value === selectedOption.value);

      if (existingIngredient) {
        alert('This ingredient is already in the cart!');
      } else {
        setCart((prevCart) => [...prevCart, { ...selectedOption, quantity: 1 }]);
      }

    
      setSelectIngredient(null);
    }
  };

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: value } : item
      )
    );
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + item.purchaseprice * item.quantity, 0);
  };

  const calculateTotal = (quantity, purchaseprice) => {
    return quantity * purchaseprice;
  };

  const handleDateChange = (index, event) => {
    const { value } = event.target;
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, date: value } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((item, i) => i !== index));
  };

  const handlePaidAmountChange = (event) => {
    const { value } = event.target;
    setPaidAmount(parseFloat(value) || 0);
  };

  const calculateDueAmount = () => {
    return calculateGrandTotal() - paidAmount;
  };

  const handleSupplierChange = (selectOption) => {
    setSelectedSupplier(selectOption);
    // You can access the selected supplier's ID using selectedOption.value
    console.log('Selected Supplier ID:', selectOption.value);
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit Purchase </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Inventory</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Purchase</li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <form className="forms-sample">
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className="form-group">
                            <label htmlFor="exampleInputUsername1">Supplier Name</label>
                            <Select
                              options={supplierOptions}
                              value={selectSupplier}
                              onChange={handleSupplierChange}
                              placeholder="Select a supplier"
                            />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group">
                            <label htmlFor="exampleInputUsername1">Invoice Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="exampleInputUsername1"
                              placeholder="Date"
                              value={invoiceDate}
                              onChange={(e) => setInvoiceDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className='col-md-4'>
                          <div className="form-group">
                            <label htmlFor="exampleInputUsername1">Ingredients</label>
                            <Select
                              options={ingredient}
                              placeholder="Select a Ingredients"
                              isSearchable
                              onChange={handleIngredient}
                              onClick={() => addProductToCart(ingredient)}

                            />
                          </div>
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Si No</th>
                              <th>Name</th>
                              <th>Purchase Price</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Expiry Date</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((selectedIngredient, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{selectedIngredient.ingredientname}</td>
                                <td>{selectedIngredient.purchaseprice}</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={selectedIngredient.quantity}
                                    onChange={(e) => handleQuantityChange(index, e)}
                                  />
                                </td>
                                <td>{selectedIngredient.unit}</td>
                                <td>
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={selectedIngredient.expirydate}
                                    onChange={(e) => handleDateChange(index, e)}
                                  />
                                </td>
                                <td>{calculateTotal(selectedIngredient.quantity, selectedIngredient.purchaseprice)}</td>
                                <td>
                                  <button type="button" className='btn btn-danger btn-sm' onClick={() => handleRemoveItem(index)}>
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="5" align="right"><strong>Grand Total:</strong></td>
                              <td>{calculateGrandTotal()}</td>
                            </tr>
                            <tr>
                              <td colSpan="5" align="right"><strong>Paid Amount:</strong></td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={paidAmount}
                                  onChange={handlePaidAmountChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="5" align="right"><strong>Due Amount:</strong></td>
                              <td><input type='text' className='form-control' value={calculateDueAmount()} /></td>
                            </tr>
                          </tfoot>
                        </table>
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
  );
}

export default EditPurchase;
