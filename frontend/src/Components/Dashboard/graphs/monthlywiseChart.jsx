import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'
import apiConfig from '../../layouts/base_url';
import Chart from 'chart.js/auto';


const Monthlywisechart =() =>{

    const [monthlySalesData, setMonthlySalesData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${apiConfig.baseURL}/api/dashboard/monthlygraph`);
            const data = await response.json();
            setMonthlySalesData(data.monthlySalesData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        if (monthlySalesData.length > 0) {
          const allMonths = generateAllMonths(); // Generate an array of all months
          const salesByMonth = monthlySalesData.reduce((obj, item) => {
            obj[item.month] = item.sales;
            return obj;
          }, {});
      
          const salesData = allMonths.map(month => ({
            month,
            sales: salesByMonth[month] || 0
          }));
      
          const ctx = document.getElementById('monthlySalesChart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: salesData.map(entry => entry.month),
              datasets: [{
                label: 'Monthly Sales',
                data: salesData.map(entry => entry.sales),
                backgroundColor:  'rgb(255, 99, 132)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        }
      }, [monthlySalesData]);

       
      const generateAllMonths = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const months = [];
      
        for (let month = 0; month < 12; month++) {
          months.push(`${currentYear}-${(month + 1).toString().padStart(2, '0')}`);
        }
      
        return months;
      };

    return (

        <>
          <canvas id="monthlySalesChart" className="mt-4"></canvas>
        </>

    )

}

export default Monthlywisechart;