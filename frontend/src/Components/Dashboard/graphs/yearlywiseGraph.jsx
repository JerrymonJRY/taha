import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import apiConfig from '../../layouts/base_url';

const YearlySalesChart = () => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        // Fetch yearly sales data
        fetchYearlySalesData();
    }, []);

    const fetchYearlySalesData = async () => {
        try {
            const response = await axios.get(`${apiConfig.baseURL}/api/dashboard/yearlyGraphsales`); // Using axios to fetch data
            const data = response.data; // Extracting data from the response

            // Extract data for chart
            const labels = data.yearlySalesData.map(item => item.year);
            const salesData = data.yearlySalesData.map(item => item.sales);

            // Create chart
            const ctx = document.getElementById('yearlySalesChart');
            const newChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Yearly Sales',
                        data: salesData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
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

            setChart(newChart);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <canvas id="yearlySalesChart" width="400" height="600"></canvas>
        </div>
    );
};

export default YearlySalesChart;
