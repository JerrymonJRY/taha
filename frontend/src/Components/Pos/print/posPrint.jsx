import React, { forwardRef } from 'react';

const PrintComponent = forwardRef(({ response }, ref) => {
    console.log('PrintComponent received response:', response);
  
  return (
    <div ref={ref}>
      {/* Check if response and response.data are not null or undefined */}
      {response && response.data && (
        <p>Order ID: {response.data._id}</p>
        // Add more order details as needed
      )}
    </div>
  );
});

export default PrintComponent;







