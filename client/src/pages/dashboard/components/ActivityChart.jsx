import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Users',
          data: [65, 78, 90, 85, 95, 110, 130, 140, 132, 150, 160, 175],
          borderColor: '#9B65FF',
          backgroundColor: 'rgba(155, 101, 255, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Sessions',
          data: [45, 55, 65, 60, 70, 80, 90, 100, 95, 110, 120, 130],
          borderColor: '#F2613F',
          backgroundColor: 'rgba(242, 97, 63, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
    
    setChartData(data);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ActivityChart;
