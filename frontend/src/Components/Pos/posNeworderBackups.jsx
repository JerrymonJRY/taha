import React from "react";
import { useState, useEffect,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';
import { FaShoppingCart, FaHistory, FaPause,FaRegCalendarAlt    } from 'react-icons/fa';
import { TbToolsKitchen3,TbChefHat  } from "react-icons/tb";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { FaHandHoldingDroplet,FaCcDinersClub  } from "react-icons/fa6";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { SiTablecheck } from "react-icons/si";
import { IoFastFoodSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import ReactToPrint   from "react-to-print";
import { MdBookOnline } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineTakeoutDining } from "react-icons/md";
import PosNeworderKotModal from "./neworder/posNeworderkotmodal";
import PosNewHoldingModal from "./neworder/posNewHoldingmodal";
import PosCashDrop from "./neworder/cashDropout";

const PosNewOrder = () => {

  const kotModalRef = useRef();
    
  const handlePrint = () => {
    if (kotModalRef.current) {
      // Use ReactToPrint to handle the print action for the KOT modal
      kotModalRef.current.handlePrint();
    }
  }
  const navigate = useNavigate();
  const [tabEnabled, setTabEnabled] = useState({
    dineIn: false,
    takeaway: false,
    delivery: false,
    
  });
  const [key, setKey] = useState(0);
  const [enableDinein, setEnableDinein] = useState(false);
  const [enableFoodmenu,setEnableFoodmenu] =useState(false);
  const [enableWaiter,setEnableWaiter] =useState(true);
  const [enableWaiters,setEnableWaiters] =useState(true);
  // const [isEnableTable, setEnableTable] = useState(true);
  // const [isEnableTakeway,setEnableTakeway] =useState(true);
  // const [isEnableDelivery,setEnableDelivery] =useState(true);
  //Value Declare
  const [waiter, setWaiter] = useState([]);
  const [selectWaiter, setSelectWaiter] = useState();
  const [delivery ,setDelivery] =useState([]);
  const [selectDelivery,setSelectDelivery] =useState();
  const [table, setTable] = useState([]);
  const [ordertable,setOrderTable] =useState([]);
  const [selectTable, setSelectTable] = useState();
  const [foodCategory, setFoodcategory] = useState([]);
  const distinctCategories = [...new Set(foodCategory.map(item => item.foodcategory.foodcategoryname))];
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vatAmount, setTotalVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [options, setOptions] = useState('');
  const [showCustomerTab, setShowCustomerTab] = useState(false);
  const [showDeliveryTab, setShowDeliveryTab] = useState(false);
  const [showFoodMenuTab, setShowFoodMenuTab] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState();
  const [placeorder, setPlaceOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [searchWaiter, setSearchWaiter] = useState('');
  const [searchTable, setSearchTable] =useState('');
  const [searchCustomer,setSearchCustomer] =useState('');
  const [searchDeliveryPerson,setSearchDeliveryPerson] =useState('');

  const [showTable, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const [posHoldingorder, setPosHoldingorder] = useState([]);
  const [isModalHold, setModalHold] = useState(false);
  const [isModalCashDrop,setModalCashDrop] =useState(false);
  const [numberofperson,setNumberofPerson] =useState('')



  const [activeTabletab,setactiveTableTab]=useState(0);
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

const handleSearchWaiter =(e) =>{
  setSearchWaiter(e.target.value);
}

const handleClearClick = () => {

  navigate('/pos');
  setSelectWaiter("");
  setSelectCustomer("");
  setSelectDelivery("");
  setSelectTable("");
  setOptions("");
  setTabEnabled({
    dineIn: false,
    takeaway: false,
    delivery: false,
  });
  setEnableDinein(false);
  setShowCustomerTab(false);
  setShowFoodMenuTab(false);
  setShowDeliveryTab(false);
  setCart([]);
  setEnableFoodmenu(false);
  setEnableWaiter(true);
  setEnableWaiters(true);

  // navigate("/pos");

};
const filteredWaiters = waiter.filter((wait) =>
  wait.waitername.toLowerCase().includes(searchWaiter.toLowerCase())
);
const handleSearchTable =(e) =>
{
  setSearchTable(e.target.value);
}

const filteredTables = table.filter((tables) =>
tables.tablename.toLowerCase().includes(searchTable.toLowerCase())
);



const handleSearchCustomer =(e) =>
{
  setSearchCustomer(e.target.value);
}

const filteredCustomers = customers.filter((customer) =>
customer.customername.toLowerCase().includes(searchCustomer.toLowerCase())
);

const handleSearchDelivery =(e) =>
{
  setSearchDeliveryPerson(e.target.value);
}

const filteredDelivery = delivery.filter((delivery) =>
delivery.dliveryname.toLowerCase().includes(searchDeliveryPerson.toLowerCase())
);



console.info({table})
  const handleDinein = (e) => {

    setTabEnabled({
      dineIn: true,
      takeaway: false,
      delivery: false
    })
    setOptions("Dine In")
    setEnableDinein(true);
    setactiveTableTab(1);
    setEnableFoodmenu(true);

  };

  const handleWaiter = (details) => {


    setSelectWaiter(details);
    setTabEnabled({
      dineIn: true,
      takeaway: true,
      delivery: true
    })

  };




  console.log("selectWaiter is not empty:", selectWaiter);


  const handleTable = (tables) => {
    if (numberofperson.trim() === '') {
    
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter the number of persons!',
      });
    } else {
     
      setSelectTable(tables);
      setEnableFoodmenu(true);
      setShowFoodMenuTab(true);
    }
    
  }


  const handleNumberofPersonChange = (e) => {
    const value = e.target.value;
  
    // Validate if the entered value is a valid positive integer
    if (/^[1-9]\d*$/.test(value) || value === '') {
      setNumberofPerson(value);
    }
  };
  
  const isValidNumber = () => {
    return /^[1-9]\d*$/.test(numberofperson);
  };

  const handleTakeway = (e) => {
    // setEnableTakeway(false);
    setTabEnabled({
      dineIn: false,
      delivery: false,
      takeaway: true
    })
    setOptions("Take Away")
    setShowFoodMenuTab(true);
  }

  const handleDelivery = (e) => {
    setTabEnabled({
      dineIn: false,
      delivery: true,
      takeaway: false
    })
    setOptions("Delivery")
    setShowCustomerTab(true);
    setShowDeliveryTab(true);
  }

  const handleCustomer = (e) => {
    setShowDeliveryTab(false);
  }

  const handleMenu = (e) => {
    setEnableFoodmenu(true);

  }

  const handleDeliveryPerson =(e) =>{
    setShowCustomerTab(false);
  }




console.info({customers})
  //Get The Waiter data
  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posWaiter`)
      .then((response) => {
        setWaiter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posDelivery`)
      .then((response) => {
        setDelivery(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {

    // axios.get(`${apiConfig.baseURL}/api/pos/posTable`)
    //   .then((response) => {
    //     setTable(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    axios.get(`${apiConfig.baseURL}/api/pos/tableorder`)
    .then((response) => {
      setTable(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

      axios.get(`${apiConfig.baseURL}/api/pos/posCustomer`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });


      // axios.get(`${apiConfig.baseURL}/api/pos/calculate`)
      // .then((response) => {
      //   setOrderTable(response.data);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
  }, []);

  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posfood`)
      .then((response) => {
        setFoodcategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addProductToCart = async (menu) => {

    let findProductInCart = cart.find(i => {
      return i._id === menu._id
    });
    console.info({ findProductInCart })
    let newCart = [];
    if (findProductInCart) {
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem._id === menu._id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            // totalAmount: cartItem.salesprice * (cartItem.quantity + 1),
            // vatAmount:(cartItem.salesprice * (cartItem.quantity + 1) * cartItem.vat.percentage) / 100,


          }
          //console.log(vatAmount);
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
          // console.log(cartItem);
        }
      });
      console.info({ newCart })
      setCart(newCart);
      const toastOptions = {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause on hover
      };
      <ToastContainer />
      // toast(`Added ${menu.foodmenuname} to the cart`, toastOptions);
      //  toast(`Added ${newItem.foodmenuname} to cart`,toastOptions)

    } else {
      let addingProduct = {
        ...menu,
        'quantity': 1,
        'totalAmount': menu.salesprice,
      }
      setCart([...cart, addingProduct]);
      const toastOptions = {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause on hover
      };

      //toast(`Added ${newItem.foodmenuname} to the cart`, toastOptions);
      <ToastContainer />
    }


  }

  const removeProduct = async (menu) => {
    const newCart = cart.filter(cartItem => cartItem._id !== menu._id);
    setCart(newCart);
  }

  useEffect(() => {
    let newTotalAmount = 0;
    let newVatAmount = 0;

    cart.forEach(icart => {

      newTotalAmount = newTotalAmount + icart.quantity * parseInt(icart.totalAmount);
      newVatAmount = parseInt(icart.vat.percentage) != 0 ? newVatAmount + icart.quantity * parseInt(icart.salesprice) * (parseInt(icart.vat.percentage) / 100) : newVatAmount;
    })

    console.log({ newVatAmount });
    setTotalAmount(newTotalAmount);
    setTotalVat(newVatAmount.toFixed(2));
    setGrandTotal((newTotalAmount + newVatAmount).toFixed())
  }, [cart])

  const handleIncrement = (prod) => {
    const { _id, salesprice } = prod
    console.log({ cart, prod })
    console.log({ prodId: prod["_id"] });
    let addQuantity = cart.map(item => {
      if (item["_id"] == prod["_id"]) {
        console.log(({ item }));
        item.quantity = item.quantity + 1;
        return item;
      }
      return item;
    })
    console.log({ addQuantity });
    console.log({ totalAmount });
    // setTotalAmount(parseInt(totalAmount) + parseInt(salesprice))
    setCart(addQuantity)
  }

  //console.log({totalAmount});

  const handleDecrement = (prod) => {
    const { _id, salesprice } = prod
    console.log({ cart, prod })
    console.log({ prodId: prod["_id"] });
    let addQuantity = cart.map(item => {
      if (item["_id"] == _id) {
        console.log(({ item }));
        item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return item;
      }
      return item;
    })
    console.log({ addQuantity });
    // setTotalAmount(parseInt(totalAmount) - parseInt(salesprice))
    setCart(addQuantity)
  }


  const handlePlaceorder = (event) => {
    event.preventDefault();
    if(!selectWaiter)
    {
      Swal.fire({
        icon: 'error',
        title: 'Waiter is Empty',
        text: 'Please add items to your cart before placing an order.',
      });
    }
    else if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Cart is empty',
        text: 'Please add items to your cart before placing an order.',
      });
    } else if (!options) {
      Swal.fire({
        icon: 'error',
        title: 'Options not selected',
        text: 'Please select options before placing an order.',
      });
    } else {
      setPlaceOrder({
        option: options,
        waiter: selectWaiter,
        customer: selectCustomer,
        table: selectTable,
        cart: cart,
        total: totalAmount,
        vat: vatAmount,
        grandTotal: grandTotal,
        delivery:selectDelivery,
        numberofperson:numberofperson, 
      })

      var posData = new FormData();
     // posData.append("customers",selectCustomer._id);
     if (selectCustomer && selectCustomer._id) {
      posData.append("customers", selectCustomer._id);
  }

  if (selectDelivery && selectDelivery._id) {
    posData.append("delivery", selectDelivery._id);
}
      posData.append("options",options);
      posData.append("grandTotal",grandTotal);
 
      for (let i = 0; i < cart.length; i++) {
       posData.append(
         `cart[${i}].foodmenuId`,
        cart[i]._id
       );
       posData.append(
        `cart[${i}].foodmenuname`,
       cart[i].foodmenuname
      );
       posData.append(
         `cart[${i}].salesprice`,
         cart[i].salesprice
       );
       posData.append(
         `cart[${i}].quantity`,
         cart[i].quantity
       );
     
    
     }
 

      posData.append("vatAmount",vatAmount);
      posData.append("total",totalAmount);
     posData.append("foodoption",options);

   
    if (selectTable && selectTable._id) {
      posData.append("tableId", selectTable._id);
      posData.append("numberofperson",numberofperson);
  }
  
  if (selectWaiter && selectWaiter._id) {
      posData.append("waiterId", selectWaiter._id);
  }
     //console.log(posData);
     
   
       const config = {
         headers: {
           'Content-Type': 'application/json',
         }
       };
   
        axios
       .post(`${apiConfig.baseURL}/api/pos/createpos`, posData, config)
      
        .then(res => {
          Swal.fire({
            title: 'Success!',
            text: 'Do you want to print the order?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes, print',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              // Open your print modal here
              console.log(posData);
              setKey((prevKey) => prevKey + 1);
              openPrintModal(res.data);
              setSelectWaiter("");
  setSelectCustomer("");
  setSelectDelivery("");
  setSelectTable("");
  setOptions("");
  setTabEnabled({
    dineIn: false,
    takeaway: false,
    delivery: false,
  });
  setEnableDinein(false);
  setShowCustomerTab(false);
  setShowFoodMenuTab(false);
  setShowDeliveryTab(false);
  setCart([]);
  setEnableFoodmenu(false);
  setEnableWaiter(true);
            } else {
              setKey((prevKey) => prevKey + 1);
            }
          });
        })
        .catch(err => console.log(err));
    }
  };



  function openPrintModal(data) {
    // Create a modal dialog or use a library like Swal
    Swal.fire({
      title: 'Order Details',
      html: getFormattedOrderDetails(data), // Call a function to format the data
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
     
      if (result.isConfirmed) {
        // Refresh the page
       
     //  navigate("/pos");
    // navigate(window.location.href);
      }
    });
  }

  useEffect(() => {
   
  }, [refresh]);

  function getFormattedOrderDetails(data) {
    // Create an HTML structure to display the order details
    let formattedDetails = '<div>';
    formattedDetails += `<p><strong>Order Number:</strong> ${data.ordernumber}</p>`;
    formattedDetails += `<p><strong>Customer:</strong> ${data.customers}</p>`;
    formattedDetails += `<p><strong>Options:</strong> ${data.options}</p>`;
    
    
    // Loop through cart items
    formattedDetails += '<p><strong>Cart:</strong></p>';
    formattedDetails += `<table className="table table-bordered">`;
    formattedDetails += `<thead>`;
    formattedDetails += `<tr>`;
    formattedDetails += `<th>Item</th>`;
    formattedDetails += `<th>Food Menu Name</th>`;
    formattedDetails += `<th>Sales Price</th>`;
    formattedDetails += `<th>Quantity</th>`;
    formattedDetails += `</tr>`;
    formattedDetails += `<tbody>`;

    data.cart.forEach((item, index) => {
      formattedDetails += `<tr>`;
      formattedDetails += `<td>${index + 1}</td>`;
    
      formattedDetails += `<td>${item.foodmenuname}</td>`;
      formattedDetails += `<td>${item.salesprice}</td>`;
      formattedDetails += `<td>${item.quantity}</td>`;
      formattedDetails += `</tr>`;
    });
    formattedDetails += `</tbody>`;
    formattedDetails += `</table>`;
    
    formattedDetails += `<p><strong>VAT Amount:</strong> ${data.vatAmount}</p>`;
    formattedDetails += `<p><strong>Total Amount:</strong> ${data.total}</p>`;
    formattedDetails += `<p><strong>Grand Total:</strong> ${data.grandTotal}</p>`;

    
    // if (data.tableId) {
    //   formattedDetails += `<p><strong>Table ID:</strong> ${data.tableId}</p>`;
    // }
    
    // if (data.waiterId) {
    //   formattedDetails += `<p><strong>Waiter ID:</strong> ${data.waiterId}</p>`;
    // }
    
    formattedDetails += '</div>';
    
    return formattedDetails;
  }


  const handleHold =(event) =>
  {
    event.preventDefault();
    if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Cart is empty',
        text: 'Please add items to your cart before placing an order.',
      });
    } else if (!options) {
      Swal.fire({
        icon: 'error',
        title: 'Options not selected',
        text: 'Please select options before placing an order.',
      });
    } else {
      setPlaceOrder({
        option: options,
        waiter: selectWaiter,
        customer: selectCustomer,
        table: selectTable,
        deliveryperson:selectDelivery,
        cart: cart,
        total: totalAmount,
        vat: vatAmount,
        grandTotal: grandTotal ,
        delivery:selectDelivery,
        numberofperson:numberofperson,  
      })

      var posData = new FormData();
     // posData.append("customers",selectCustomer._id);
     if (selectCustomer && selectCustomer._id) {
      posData.append("customers", selectCustomer._id);
  }
  if (selectDelivery && selectDelivery._id) {
    posData.append("delivery", selectDelivery._id);
}
      posData.append("options",options);
      posData.append("grandTotal",grandTotal);
 
      for (let i = 0; i < cart.length; i++) {
       posData.append(
         `cart[${i}].foodmenuId`,
        cart[i]._id
       );
       posData.append(
         `cart[${i}].salesprice`,
         cart[i].salesprice
       );
       posData.append(
         `cart[${i}].quantity`,
         cart[i].quantity
       );
     
    
     }
 

      posData.append("vatAmount",vatAmount);
      posData.append("total",totalAmount);
     posData.append("foodoption",options);
    //  posData.append("tableId",selectTable._id);
    //  posData.append("waiterId",selectWaiter._id);
    if (selectTable && selectTable._id) {
      posData.append("tableId", selectTable._id);
  }
  
  if (selectWaiter && selectWaiter._id) {
      posData.append("waiterId", selectWaiter._id);
  }
     //console.log(posData);
     
   
       const config = {
         headers: {
           'Content-Type': 'application/json',
         }
       };
   
        axios
       .post(`${apiConfig.baseURL}/api/pos/createHold`, posData, config)
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
            if (result.isConfirmed) {
              // Open your print modal here
              console.log(res);
              openPrintModal(res.data);
            } else {
              setRefresh((prevRefresh) => !prevRefresh);
            }
          });
        })
        .catch(err => console.log(err));
    }
  }


  const handleQuickPay =(event) =>
  {
    event.preventDefault();
    if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Cart is empty',
        text: 'Please add items to your cart before placing an order.',
      });
    } else if (!options) {
      Swal.fire({
        icon: 'error',
        title: 'Options not selected',
        text: 'Please select options before placing an order.',
      });
    }
    else if (options.toLowerCase() === 'dine in') {
      Swal.fire({
        icon: 'error',
        title: 'Dine-In Not Allowed',
        text: 'Quick pay is not allowed for dine-in orders.',
      });
    }
     else {
      setPlaceOrder({
        option: options,
        waiter: selectWaiter,
        customer: selectCustomer,
        table: selectTable,
        cart: cart,
        total: totalAmount,
        vat: vatAmount,
        grandTotal: grandTotal,
        delivery:selectDelivery,
        numberofperson:numberofperson,   
      })
      console.log(options);

      var posData = new FormData();
     // posData.append("customers",selectCustomer._id);
     if (selectCustomer && selectCustomer._id) {
      posData.append("customers", selectCustomer._id);
  }
  if (selectDelivery && selectDelivery._id) {
    posData.append("delivery", selectDelivery._id);
}
      posData.append("options",options);
      posData.append("grandTotal",grandTotal);
 
      for (let i = 0; i < cart.length; i++) {
       posData.append(
         `cart[${i}].foodmenuId`,
        cart[i]._id
       );
       posData.append(
         `cart[${i}].salesprice`,
         cart[i].salesprice
       );
       posData.append(
         `cart[${i}].quantity`,
         cart[i].quantity
       );
     
    
     }
 

      posData.append("vatAmount",vatAmount);
      posData.append("total",totalAmount);
     posData.append("foodoption",options);
   
    if (selectTable && selectTable._id) {
      posData.append("tableId", selectTable._id);
  }
  
  if (selectWaiter && selectWaiter._id) {
      posData.append("waiterId", selectWaiter._id);
  }
     //console.log(posData);
     
   
       const config = {
         headers: {
           'Content-Type': 'application/json',
         }
       };
   
        axios
       .post(`${apiConfig.baseURL}/api/pos/createQuickpay`, posData, config)
       
        .then(res => {
          Swal.fire({
            title: 'Success!',
            text: 'Do you want to print the order?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes, print',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              // Open your print modal here
              console.log(res);
              openPrintModal(res.data);
            } else {
              setRefresh((prevRefresh) => !prevRefresh);
            }
          });
        })
        .catch(err => console.log(err));
    }

  }



const handleTabClick =() =>{
  setModalOpen(true);
}
 
  
  
  
  
  

  const handleCloseTable = () => {
    setShowModal(false);
  };

    const handleCloseModal = () => {
    setModalOpen(false);
  };



  const handleHoldClick =() =>
  {
    setModalHold(true);
  }

  const handleDropoutClick =() =>{

    setModalCashDrop(true);

  } 

 




  console.info({ placeorder })
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
            <div className="col-lg-6 pl-0"><button type="button" key={key} onClick={handlePlaceorder} className="btn btn-warning w-100 mb-2 p-2">Place Order</button></div>
            <div className="col-lg-6"><button type="button" onClick={handleHold} className="btn btn-danger w-100 mb-2 p-2">Hold</button></div>
            <div className="col-lg-6 pl-0"><button type="button" onClick={handleQuickPay} className="btn btn-success w-100 mb-2 p-2">Quick Pay</button></div>
          </div>
        </div>
      </div>
      <div className="col-lg-auto" style={{ background: 'white', }}>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
  <a class="nav-link active text-center navleft" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" style={{ marginTop: '10px' }}
  onClick={handleClearClick}
  
  >
  <FaHistory className="mr-2" /><br /> Clear
  </a>
  <a
        className="nav-link text-center navleft"
        id="v-pills-profile-tab"
        data-toggle="pill"
        href="#v-pills-profile"
        role="tab"
        aria-controls="v-pills-profile"
        aria-selected="false"
        onClick={handleTabClick}
      >
        <TbToolsKitchen3 className="mr-2" /><br /> KOT
      </a>

  <a
   className="nav-link text-center navleft"
   id="v-pills-messages-tab"
   data-toggle="pill"
   href="#v-pills-messages"
   role="tab"
   aria-controls="v-pills-messages"
   aria-selected="false"
   onClick={handleHoldClick} >
  <BsFillPauseCircleFill className="mr-2" /><br /> Holding Order
  </a>
  <a class="nav-link text-center navleft" 
  id="v-pills-cash-drop-tab" 
  data-toggle="pill" 
  href="#v-pills-cash-drop" 
  role="tab" 
  aria-controls="v-pills-cash-drop" 
  aria-selected="false"
  onClick={handleDropoutClick}
  >
  <FaHandHoldingDroplet className="mr-2" /> <br /> Cash Drop/Out
  </a>
  <a class="nav-link text-center navleft" id="v-pills-drawer-tab" data-toggle="pill" href="#v-pills-drawer" role="tab" aria-controls="v-pills-drawer" aria-selected="false">
  <RiArchiveDrawerLine className="mr-2" /><br />
 Open Drawer
  </a>
  <a class="nav-link text-center navleft" id="v-pills-invoice-tab" data-toggle="pill" href="#v-pills-invoice" role="tab" aria-controls="v-pills-invoice" aria-selected="false">
  <LiaFileInvoiceSolid className="mr-2" /><br /> Invoice Report
  </a>
</div>
      </div>
      <div className="col-sm-7 col-lg-7">
        <div className="tbl-h">
          <ul className="nav nav-tabs nav-justified" role="tablist">
            {enableWaiters && (
            <li className="nav-item ">
              {/* <a className="nav-link  active" onClick={handleWaiter} data-toggle="tab" href="#waiter" role="tab" aria-controls="kiwi2" aria-selected="false">Waiter</a> */}
              <a className="nav-link pos active"
                onClick={() => {
                  setSelectWaiter("")
                  setSelectCustomer("")
                  setSelectDelivery("")
                  setSelectTable("")
                  setOptions("")
                  setTabEnabled({
                    dineIn: false,
                    takeaway: false,
                    delivery: false
                  })
                  setEnableDinein(false)
                  setShowCustomerTab(false)
                  setShowFoodMenuTab(false)
                  setShowDeliveryTab(false)
                }}
                data-toggle="tab" href="#waiter" role="tab" aria-controls="kiwi2" aria-selected="false"><TbChefHat className="mr-2" />Select Waiter</a>
            </li>
          )}
            {
              tabEnabled.dineIn && (<li className="nav-item">
                <a className="nav-link pos " onClick={handleDinein} data-toggle="tab" href="#table" role="tab" aria-controls="duck2" aria-selected="true"><FaCcDinersClub className="mr-2" />Dine In</a>
              </li>
            )}
            {/* {
              enableDinein && ( <li className="nav-item">
                <a className="nav-link pos "  onClick={() => {
                // handleDinein();
                setSelectTable(''); 
              }} data-toggle="tab" href="#table" role="tab" aria-controls="duck2" aria-selected="true"><SiTablecheck className="mr-2" />Table</a>
              </li>
           ) } */}
            {
              tabEnabled.delivery && <li className="nav-item">
                <a className="nav-link pos" onClick={handleDelivery} data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true"><CiDeliveryTruck className="mr-2" />Delivery</a>
              </li>
            }

            {
              showCustomerTab && <li className="nav-item">
                <a className="nav-link pos" onClick={handleCustomer} data-toggle="tab" href="#customer" role="tab" aria-controls="duck2" aria-selected="true"><FaUserAlt className="mr-2"  />Customer</a>
              </li>
            }
             {
              showDeliveryTab && <li className="nav-item">
                <a className="nav-link pos" onClick={handleDeliveryPerson} data-toggle="tab" href="#delivery" role="tab" aria-controls="duck2" aria-selected="true"><MdDeliveryDining className="mr-2" />Delivery Boy</a>
              </li>
            }
            {
              tabEnabled.takeaway && <li className="nav-item">
                <a className="nav-link pos" onClick={handleTakeway} data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true"><MdOutlineTakeoutDining className="mr-2" />Take Away</a>
              </li>
            }
            {
              showFoodMenuTab && <li className="nav-item">
              <a className="nav-link pos"  onClick={handleMenu}  data-toggle="tab" href="#foodmenu" role="tab" aria-controls="duck2" aria-selected="true"><IoFastFoodSharp className="mr-2" />Food Menu</a>
          </li>
            }
          </ul>
        </div>
        <div className="tab-content mt-3">
          { enableWaiter && (
          <div className="tab-pane active" id="waiter" role="tabpanel" aria-labelledby="duck-tab">

            

              <input
        type="text"
        placeholder="Search waiters..."
        value={searchWaiter}
        className="form-control"
        onChange={handleSearchWaiter}
      /> <br />
              <div className="row">
              {filteredWaiters.map((wait, index) => (
      <div key={index} className={`col-sm-3 col-md-3 ${selectWaiter === wait ? 'disabled' : ''}`}>
          <div
               className={`menu-box ${selectWaiter ? 'read-only' : 'selectable'}`}
            onClick={() => handleWaiter(wait)}
          >
            <h6><TbChefHat className="mr-2" /> <br />{wait.waitername}</h6>
          </div>
        </div>
      ))}
              </div>
            
            {/* } */}
          </div>
            ) }
          {/* <div className="tab-pane " id="table" role="tabpanel" aria-labelledby="duck-tab">

          <input
        type="text"
        placeholder="Search Tables..."
        value={searchTable}
        className="form-control"
        onChange={handleSearchTable}
      /><br />
            <div className="row">
              {
                filteredTables.map((tables, index) => (
                  // <div className="col-sm-3 col-md-3">
                  <div key={index} className={`col-sm-3 col-md-3 ${selectTable === tables ? 'disabled' : ''}`}>
                     <div
               className={`menu-box ${selectTable ? 'read-only' : 'selectable'}`} onClick={(e) => {
                      setSelectTable(tables)
                      setShowFoodMenuTab(true)
                    }}>

                      <h6><SiTablecheck className="mr-2" /><br />{tables.tablename}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div> */}
          {enableDinein && (
    <div className="tab-pane" id="table" role="tabpanel" aria-labelledby="duck-tab">
      <input
        type="text"
        placeholder="Search Tables..."
        value={searchTable}
        className="form-control"
        onChange={handleSearchTable}
      />
      <br />
      <div className="row">
        {filteredTables.map((tables, index) => (

            
          
          <div
            key={index}
            className={`col-sm-3 col-md-3 ${selectTable === tables ? 'disabled' : ''}`}
          >
            <div
              className={`menu-box ${
                selectTable ? 'read-only' : 'selectable'
              }`}
             
            >
              <h6>
                <SiTablecheck className="mr-2" />
                <br />
                {tables.tablename}
              </h6>
              <p>SeatCapacity:{tables.seatcapacity}</p>
              <p>Avilable Seat:{tables.availableSeat}</p>
             
            </div>
            <div class="flex-row-container">

  <div class="flex-row-item">
  <input type="text" name="numberofperson" value={numberofperson} onChange={(e) => {setNumberofPerson(e.target.value)
  handleNumberofPersonChange(e)}} className="form-control" placeholder="No Of Person"  readOnly={tables.availableSeat === 0}   />
  
  </div>
  <div class="flex-row-item">
  <a href="#foodmenu" className={`btn btn-outline-primary ${
            !isValidNumber() ||
            tables.availableSeat === 0 ||
            parseInt(numberofperson) > parseInt(tables.seatcapacity)
              ? 'disabled'
              : ''
          }`}
          
          onClick={(e) => {
           
              setSelectTable(tables);
              handleTable(tables);
          
          
          }}   >+</a>
  </div>
 

</div>
          </div>
          ))}
      </div>
    </div>
  )}
          <div className="tab-pane " id="customer" role="tabpanel" aria-labelledby="duck-tab">
          <input
        type="text"
        placeholder="Search Customers..."
        value={searchCustomer}
        className="form-control"
        onChange={handleSearchCustomer}
      /><br />
            <div className="row">
              {
                filteredCustomers.map((customer, index) => (
                  <div className="col-sm-3 col-md-3">
                    <div className="menu-box" onClick={(e) => {
                      setSelectCustomer(customer)
                      setShowFoodMenuTab(true)
                      setShowDeliveryTab(false)
                    }}>

                      <h6><FaUserAlt className="mr-2"  /><br />{customer.customername}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tab-pane " id="delivery" role="tabpanel" aria-labelledby="duck-tab">
            
          <input
        type="text"
        placeholder="Search Delivery..."
        value={searchDeliveryPerson}
        className="form-control"
        onChange={handleSearchDelivery}
      /><br />
            <div className="row">
              {
                filteredDelivery.map((delivery, index) => (
                  <div className="col-sm-3 col-md-3">
                    <div className="menu-box" onClick={(e) => {
                      setSelectDelivery(delivery)
                      setShowFoodMenuTab(true)
                      setShowCustomerTab(false)
                    }}>

                      <h6><MdDeliveryDining className="mr-2" /><br />{delivery.dliveryname}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {enableFoodmenu && (
          <div className="tab-pane " id="foodmenu" role="tabpanel" aria-labelledby="duck-tab">
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
                    .filter(item => item.foodcategory.foodcategoryname === distinctCategories[activeTab]
                      &&
                      item.foodmenuname.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    .map((menu, index) => (
                      <div className="col-sm-3 col-sm-3" key={index}>
                        <div className="menu-box" onClick={() => addProductToCart(menu)}>

                          <div className="menu-div">
                            {/* <img src={`/uploads/${menu.photo}`} className=" foodimg" /> */}
                            <h6 className="mt-2">{menu.foodmenuname}</h6>
                            <p>Price: {menu.salesprice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>}
            </div>
          </div>
          )}

        </div>
      </div>

      <div class="modal" id="print-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Order Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="print-button">Print</button>
      </div>
    </div>
  </div>
</div>
{/* KOTMODAl */}
<PosNeworderKotModal isModalOpen={isModalOpen} />


{/* Holding Order */}

<PosNewHoldingModal isModalHold={isModalHold} setModalHold={setModalHold} />


<PosCashDrop isModalCashDrop={isModalCashDrop} setModalCashDrop={setModalCashDrop} />

         
    </div>
  )


}

export default PosNewOrder;