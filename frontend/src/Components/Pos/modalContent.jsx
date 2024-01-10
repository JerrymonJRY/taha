import React, { forwardRef } from 'react';
//import Logo from '../../assets/images/pos/'

const ModalContent = forwardRef(({ kotdata }, ref) => {

    if (!kotdata) {
        return <p>No data</p>;
      }
  return (
    <div ref={ref}>
      <div className='container'>
      {kotdata ? (
        kotdata.map((order) => (
          <div key={order.id}>
            {/* Render the data from kotdata here */}
            <img src="assets/images/pos/vertics-logo.png " className="center" />

            <h5 className="text-right">Order Number: {order.ordernumber}</h5>
            <h6 className="text-right">Options: {order.options}</h6>
            <h6 className="text-right">Customer Name: {order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
            <h6 className="text-right">Table: {order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
            <h6 className="text-right">Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Si No</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((cartItem, key) => (
                  <tr key={cartItem.foodmenuId}>
                    <td>{key + 1}</td>
                    <td>{cartItem.menuItemDetails.foodmenuname}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.salesprice}</td>
                   
                    {/* Render other cart item details here */}
                  </tr>
                ))}
              </tbody>
            </table>
            <h6 className="text-right">Total: {order.total}</h6>
            <h6 className="text-right">Vat Amount: {order.vatAmount}</h6>
            <h6 className="text-right">Grand Total: {order.grandTotal}</h6>
          </div>
        ))
      ) : (
        <p>No data</p>
      )}
      </div>
    </div>
  );
});

export default ModalContent;
