import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const SalesGraph = ({ salesData }) => {
  useEffect(() => {
    if (!salesData) return;

    const ctx = document.getElementById('salesChart').getContext('2d');

    const months = salesData.map(data => data._id);
    const salesByMonth = salesData.map(data => data.weeks.map(week => week.sales));

    const chartData = {
      labels: months,
      datasets: [{
        label: 'Sales',
        data: salesByMonth.map(sales => sales.reduce((acc, curr) => acc + curr)),
        backgroundColor: months.map((_, index) => `rgba(${index * 30}, ${index * 50}, ${index * 70}, 0.5)`),
        borderColor: months.map((_, index) => `rgba(${index * 30}, ${index * 50}, ${index * 70}, 1)`),
        borderWidth: 1
      }]
    };

    const salesChart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      salesChart.destroy();
    };
  }, [salesData]);

  return (
    <div>
    
      <canvas id="salesChart" width="800" height="400"></canvas>
    </div>
  );
};

export default SalesGraph;

