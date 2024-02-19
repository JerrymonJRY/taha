import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify
import apiConfig from '../../layouts/base_url';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
const PosOrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodCategory, setFoodcategory] = useState([]);
  const distinctCategories = [...new Set(foodCategory.map(item => item.foodcategory.foodcategoryname))];
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vatAmount, setTotalVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [menu, setMenu] = useState([]);
  const [placeorder, setPlaceOrder] = useState({});
  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/api/pos/getEdit/${id}`)
      .then((response) => {
        const data = response.data[0];

        console.info({reponsedata: data})

        if (data && data.cart && Array.isArray(data.cart)) {
          setCart(data.cart);

          data.cart.forEach(item => {
            console.log("Food Item: " + item.foodmenuname);
            console.log("Quantity: " + item.quantity);
            console.log("Sales Price: " + item.salesprice);
            console.log("--------------");
          });
        } else {
          console.log("Cart data is not available or is in an unexpected format.");
        }

        if (data && data.vatAmount) {
          console.log(data.vatAmount);
        
        } else {
          console.log("VAT amount not found in the data.");
        }

        if (data && data.total) {
          console.log(data.total);
        
        } else {
          console.log("Total amount not found in the data.");
        }

        if (data && data.grandTotal) {
          console.log(data.grandTotal);
          
        } else {
          console.log("Grand total not found in the data.");
        }
        // setTotalVat(data.vatAmount);
        // setTotalAmount(data.total);
        // setGrandTotal(data.grandTotal);
       

      if (data && data.vatAmount) {
     console.log();
       setTotalVat(data.vatAmount);
      } else {
      console.log("VAT amount not found in the data.");
    }

       console.log(response.data);
        const foodmenuIds = orderData.map(order => (
          order.cart.map(item => item.menuItemDetails._id)
        )).flat();

      
        setMenu(foodmenuIds);
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  console.info({grandTotal, totalAmount})

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}/api/pos/posfood`)
      .then((response) => {
        setFoodcategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addProductToCart = (menu) => {
    console.info({menu})
    let findProductInCart = cart.find(i => i.foodmenuId === menu._id);
    let newCart = [];

    if (findProductInCart) {
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem.foodmenuId === menu._id) {
          newItem = {
            ...cartItem,
            quantity: parseInt(cartItem.quantity) + 1,
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);

      // Trigger toast for adding to cart
      toast(`Added ${menu.foodmenuname} to the cart`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

    } else {
      let addingProduct = {
        ...menu,
        foodmenuId: menu._id,
        'quantity': 1,
        'totalAmount': menu.salesprice,
      }

      setCart([...cart, addingProduct]);

      // Trigger toast for adding to cart
      toast(`Added ${menu.foodmenuname} to the cart`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const removeProduct = async (menu) => {
    console.info({menu})
    const newCart = cart.filter(cartItem => cartItem.foodmenuId !== menu.foodmenuId);
    setCart(newCart);
  }
console.info({cart})
  useEffect(() => {
    let newTotalAmount = 0;
    // let newVatAmount = 0;

    // cart.forEach(icart => {
    //   newTotalAmount = newTotalAmount + icart.quantity * parseInt(icart.totalAmount);
    //   newVatAmount = parseInt(icart.vat.percentage) !== 0 ? newVatAmount + icart.quantity * parseInt(icart.salesprice) * (parseInt(icart.vat.percentage) / 100) : newVatAmount;
    // })
    let newVatAmount = 0;

cart.forEach(icart => {
  if (icart.vat && typeof icart.vat.percentage !== 'undefined') {
    newTotalAmount = totalAmount + icart.quantity * parseInt(icart.salesprice);
    newVatAmount = parseInt(icart.vat.percentage) !== 0 ? newVatAmount + icart.quantity * parseInt(icart.salesprice) * (parseInt(icart.vat.percentage) / 100) : vatAmount;
  } else {
    newTotalAmount = newTotalAmount + parseInt(icart.quantity) * parseInt(icart.salesprice);
  }
});

    setTotalAmount(newTotalAmount);
    setTotalVat(newVatAmount);
    setGrandTotal((newTotalAmount + newVatAmount));
  }, [cart])

  const handleIncrement = (prod) => {
    console.info({prod})
    const { foodmenuId } = prod;
    let addQuantity = cart.map(item => {
      if (item.foodmenuId === prod.foodmenuId) {
        item.quantity = parseInt(item.quantity) + 1;
      }
      return item;
    })
    setCart(addQuantity);
  }

  const handleDecrement = (prod) => {
    const { foodmenuId } = prod;
    let addQuantity = cart.map(item => {
      if (item.foodmenuId === foodmenuId) {
        item.quantity = parseInt(item.quantity) > 1 ? parseInt(item.quantity) - 1 : 1;
      }
      return item;
    })
    setCart(addQuantity);
  }

  const handlePlaceorder =() =>
  {
    setPlaceOrder({
    
      cart: cart,
      total: totalAmount,
      vat: vatAmount,
      grandTotal: grandTotal,
    
    
    })

    
    var posData = new FormData();
    for (let i = 0; i < cart.length; i++) {
    //  posData.append(`cart[${i}].foodmenuId`, cart[i]._id);
      posData.append(`cart[${i}].salesprice`, cart[i].salesprice);
      posData.append(`cart[${i}].quantity`, cart[i].quantity);
      posData.append(
        `cart[${i}].foodmenuname`,
       cart[i].foodmenuname
      );
    
      if ('foodmenuId' in cart[i]) {
        posData.append(`cart[${i}].foodmenuId`, cart[i].foodmenuId);
      }
 
    }
 posData.append("vatAmount",vatAmount);
 posData.append("total",totalAmount);
 posData.append("grandTotal",grandTotal);
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      axios
       .put(`${apiConfig.baseURL}/api/pos/updatepos/${id}`, posData, config)
        // .then(res => {
        //    console.log(res);
        //    navigate('/posorder');
        //  })
        //  .catch(err => console.log(err));
        .then(res => {
          Swal.fire({
            title: 'Success!',
            text: 'Do you want to print the order?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes, print',
            cancelButtonText: 'No',
          }).then((result) => {

            console.log(res.data.existingEntry)

      printOrderDetails(res.data.differences,res.data.updatePos);
         navigate('/pos');
          });
        })
        .catch(err => console.log(err));
    }

     // console.log(posData);
     const imagePaths = "/assets/images/pos/taha.png";

     const printOrderDetails = (differences,updatePos) => {

      const printWindow = window;
    printWindow.document.write('<html><head><title>Order Details</title>');
    // Add style for center alignment and table styling
    printWindow.document.write(`
      <style>
        body { text-align: center; }
        table {
          width: 100%;
          border-collapse: collapse;
         
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        td
        {
          font-size:13px;
          text-transform: capitalize;
        }
        .order-info {
          font-size:13px;
          text-transform: capitalize;
        }
      </style>
    `);
    printWindow.document.write('</head><body>');
    
    // Include order details and image in the print window
    
    printWindow.document.write(`<img src="${imagePaths}" alt="Logo" style="max-width: 100%;" onload="window.print(); location.reload();">`);
   
    if (updatePos) {
      printWindow.document.write(`<p>Order ID: ${updatePos.ordernumber}</p>`);
      const orderDate = new Date(updatePos.updatedAt);
      const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}-${orderDate.getFullYear()}`;
      const formattedTime = `${orderDate.getHours().toString().padStart(2, '0')}:${orderDate.getMinutes().toString().padStart(2, '0')}:${orderDate.getSeconds().toString().padStart(2, '0')}`;
      printWindow.document.write(`<p>Date and Time: ${formattedDate} ${formattedTime}</p>`);
    }
   
    
if (differences && differences.length > 0) {
  
  printWindow.document.write(`
    <table>
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Qty</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
  `);
  
  let subtotal = 0;
  let subTotals = 0;
  let vatAmounts = 0;

  differences.forEach(item => {
    if (item.quantity !== 0) {

      const totalPrice = item.quantity * item.salesprice;
      subtotal += totalPrice;
      vatAmounts =(subtotal * 5)/100;
      subTotals = subtotal-vatAmounts;


     
    printWindow.document.write(`
    <tr>
    <td>${item.foodmenuname}</td>
    <td>${item.quantity}</td>
    <td>${totalPrice}</td>
</tr>
    `);

    

    

    }
  });
  printWindow.document.write('</tbody></table>');
   
    printWindow.document.write(`<p>Subtotal: ${subTotals}</p>`);
    printWindow.document.write(`<p>VAT Amount: ${vatAmounts}</p>`);
    printWindow.document.write(`<p>Overall Total: ${subtotal}</p>`);

 


 
}



printWindow.document.write('</body></html>');

  };
  
  
    const componentRef = useRef(null);
  
    // Use the hook to enable printing
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
  



  return (
    <div className="row">
           <div className="col-sm-4 col-lg-auto">
        <div className="wraper shdw">

          <div className="table-responsive vh-70" style={{ height: "300px", overflowY: "scroll" }}>
            <table className="table ">
              <thead>
                <tr className="thead-light">
                  <th >No.</th>
                  <th>Name</th>
                  <th >U.Price</th>
                  <th >Qty</th>

                  {/* <th scope="col">Total</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody >
                {cart ? cart.map((cartProduct, key) => <tr key={key}>
                  {/* <td>{cartProduct._id}</td> */}
                  <td>{key + 1}</td>
                  <td>{cartProduct.foodmenuname}</td>
                  <td>{cartProduct.salesprice}</td>
                  <td><button className='btn btn-danger btn-sm cartminus' onClick={() => handleDecrement(cartProduct)}>-</button><input type="text" style={{ width: '20px' }} value={cartProduct.quantity} /><button className='btn btn-success btn-sm cartplus' onClick={() => handleIncrement(cartProduct)}>+</button></td>

                  {/* <td>{cartProduct.totalAmount}</td> */}
                  <td>
                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>x</button>
                  </td>

                </tr>)

                  : 'No Item in Cart'}


              </tbody>
            </table>
          </div>

          <div className="table-responsive">
            <table className="table">
              <tr>
                <td>Total </td>
                <th className="text-right">${totalAmount}</th>
              </tr>
              <tr>
                <td >Discount  </td>
                <th className="text-right"></th>
              </tr>
              <tr>
                <td>VAT </td>
                <th className="text-right">${vatAmount}</th>
              </tr>
              <tr>
                <th>Grand Total   </th>
                <th className="text-right">{grandTotal}</th>
              </tr>
              <tr>
                <td>

                 
                </td>
                <th ></th>
              </tr>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6"><button type="button" className="btn btn-danger w-100 mb-2 p-2">Cancel</button></div>
     
            <div className="col-lg-6 pl-0"><button type="button" onClick={handlePlaceorder} className="btn btn-success w-100 mb-2 p-2">Update Order</button></div>
          </div>
        </div>
      </div>
      <div className="col-sm-7 col-lg-7">
        <div className="tbl-h">
          <ul className="nav nav-tabs nav-justified" role="tablist">
            <li className="nav-item">
              <a className="nav-link pos active"  data-toggle="tab" href="#foodmenu" role="tab" aria-controls="duck2" aria-selected="true"><IoFastFoodSharp className="mr-2" />Food Menu</a>
            </li>
          </ul>
        </div>
        <div className="tab-content mt-3">
          <div className="tab-pane active" id="foodmenu" role="tabpanel" aria-labelledby="duck-tab">
            <div className="tbl-h">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search foodmenu..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
              </div>
              <ul className="nav nav-pills flex-columns shdw-lft " id="myTab" role="tablist">
                {distinctCategories.map((category, index) => (
                  <li className="nav-item">
                    <a
                      key={index}
                      className={`nav-item nav-link ${index === activeTab ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-content p-3" id="myTabContents">
              {isLoading ? 'Loading' : <div className="row">
                {foodCategory.length > 0 &&
                  foodCategory
                    .filter(item => item.foodcategory.foodcategoryname === distinctCategories[activeTab] &&
                      item.foodmenuname.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((menu, index) => (
                      <div className="col-sm-3 col-sm-3" key={index}>
                        <div className="menu-box" onClick={() => addProductToCart(menu)}>
                          <div className="menu-div">
                            <h6 className="mt-2">{menu.foodmenuname}</h6>
                            <p>Price: {menu.salesprice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosOrderEdit;

