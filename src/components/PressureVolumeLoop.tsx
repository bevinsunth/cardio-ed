import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const PressureVolumeLoop: React.FC = () => {
  const options = {
    scales: {
      x: {
        type: 'linear', // sets the x-axis to linear
        display: false, // hides the x-axis line
      },
      y: {
        type: 'linear', // sets the y-axis to linear
        display: false, // hides the y-axis line,
        reverse: true,
      },
    },
    elements: {
      line: {
        tension: 0.25, // sets the line tension
      },
    },
  };


  const data = {
    datasets: [
      {
        label: 'Pressure Volume Loop',
        data: [
          {x: 230, y: 559},
          {x: 322, y: 575},
          {x: 609, y: 562},
          {x: 609, y: 296},
          {x: 384, y: 112},
          {x: 232, y: 225},
          {x: 230, y: 559},
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgb(255, 99, 132)',
        showLine: true,
        fill: true,
        pointRadius: 10,
      },
    ],
  };


  return <Line options={options} data={data} />;
};

export default PressureVolumeLoop;
