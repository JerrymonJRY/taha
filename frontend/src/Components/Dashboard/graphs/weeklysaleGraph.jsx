import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'
import apiConfig from '../../layouts/base_url';
import Chart from 'chart.js/auto';

const Weeklysalesgraphs =() =>{

    const [weeklySalesData, setWeeklySalesData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/api/dashboard/weeklygraph`); // Adjust the URL as per your backend route
                setWeeklySalesData(response.data.weeklySalesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading && weeklySalesData.length > 0) {
          const ctx = chartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'doughnut', // Change chart type to 'doughnut'
            data: {
              labels: weeklySalesData.map(weekData => weekData.week),
              datasets: [{
                label: 'Weekly Sales',
                data: weeklySalesData.map(weekData => weekData.sales),
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  // Add more colors as needed
                ],
                hoverOffset: 4, // Increase hover offset for better visualization
              }]
            },
           
          });
        }
      }, [loading, weeklySalesData]);



    useEffect(() => {
        if (Object.keys(weeklySalesData).length !== 0) {
            const labels = Object.keys(weeklySalesData).map(key => key.split(' - ')[0]);
            const sales = Object.values(weeklySalesData).map(item => item.sales);

            const ctx = document.getElementById('salesCharts').getContext('2d');

            new Chart(ctx, {
                type: 'doughnut', // Set chart type to doughnut
                labels: labels,
                data: {
                    
                    datasets: [
                        {
                            label: 'Weekly Sales',
                            data: sales,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)'
                            ]
                        }
                    ]
                }
            });
        }
    }, [weeklySalesData]);


    return (

        <>
         <canvas id="salesCharts" ></canvas>
        </>

    )
}

export default Weeklysalesgraphs;