import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import apiConfig from '../../layouts/base_url';

const HighSales = () => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState('daily');

  useEffect(() => {
    fetchData();
  }, [viewType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/api/dashboard/highestSales/${viewType}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { name: 'SI No', label: 'Si No', selector: (row, index) => index + 1 },
    {
      name: 'Food Menu Name',
      selector: 'foodmenuname',
      sortable: true,
    },
    {
      name: 'Total Quantity',
      selector: 'totalQuantity',
      sortable: true,
    },
  ];

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  return (
    <div>
    
      <div>
     
        <select id="viewType" className='form-control' value={viewType} onChange={handleViewTypeChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="halfyearly">Halfyearly</option>
          <option value="fullyearly">Full Year</option>
        </select>
      </div>
      <DataTable
        title={`${viewType.charAt(0).toUpperCase() + viewType.slice(1)} Sales Report`}
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
      />
    </div>
  );
};

export default HighSales;
