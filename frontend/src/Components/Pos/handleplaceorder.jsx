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
              openPrintModal(res.data);
            } else {
              // navigate('/posorder');
              setRefresh((prevRefresh) => !prevRefresh);
            }
          });
        })
        .catch(err => console.log(err));
    }
  };
