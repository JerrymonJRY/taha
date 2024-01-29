import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import apiConfig from '../../layouts/base_url';
import Chart from 'chart.js/auto';

const FoodOptionsGraph = () => {
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchFoodOptionsData();
  }, []);

  const fetchFoodOptionsData = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/api/dashboard/foodoptionsgraph`);
      const responseData = response.data;
      renderChart(responseData);
    } catch (error) {
      console.error('Error fetching food options data:', error);
    }
  };

  const renderChart = (data) => {
    const ctx = chartRef.current.getContext('2d');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Dine In', 'Take Away', 'Delivery'],
        datasets: [{
          data: [data.dineInCount, data.takeAwayCount, data.deliveryCount],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
          hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        }],
      },
    });
    setChart(pieChart);
  };

  return (
    <div>
      <h2>Food Options</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default FoodOptionsGraph;
