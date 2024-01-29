import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'
import apiConfig from '../../layouts/base_url';
import Chart from 'chart.js/auto';

const Dailysalesgraphs =() =>{

    const [dailySalesData, setDailySalesData] = useState([]);
    useEffect(() => {
        const fetchDailySalesData = async () => {
          try {
            const response = await fetch(`${apiConfig.baseURL}/api/dashboard/dailygraph`);
            const data = await response.json();
            // Sort the data by date before setting the state
            const sortedData = data.dailySalesData.sort((a, b) => new Date(a.day) - new Date(b.day));
            setDailySalesData(sortedData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDailySalesData();
      }, []);

      useEffect(() => {
        if (dailySalesData.length > 0) {
          const labels = dailySalesData.map(entry => entry.day);
          const sales = dailySalesData.map(entry => entry.sales);
    
          const ctx = document.getElementById('dailySalesChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'Daily Sales',
                data: sales,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      }, [dailySalesData]);

    return (

        <>
         <canvas id="dailySalesChart" className="mt-4"></canvas>
        </>

    )
}

export default Dailysalesgraphs;