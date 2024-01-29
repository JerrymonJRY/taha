import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiConfig from '../../layouts/base_url';

const HighestSalesGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiConfig.baseURL}/api/dashboard/dailyhighestsales`); 
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { name: 'SI No', label: 'Si No', selector: (row, index) => index + 1 },
    { name: 'Foodmenu Name', label: 'Food Menu Name', selector: 'foodmenuname' },
    { name: 'TotalQuantity', label: 'Total Quantity', selector: 'totalQuantity' },
    // Add more columns as needed
  ];
  

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default HighestSalesGraph;
