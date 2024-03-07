import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ChartConfiguration, ChartDataset, ScatterDataPoint, TooltipItem, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement);

const backgroundImageUrl = '/images/simple-pressure-loop.png'; // Replace with the path to your image

// Define the props interface if needed
// interface PressureVolumeChartProps {
//   // Define your props here
// }

const PressureVolumeChart: React.FC/*<PressureVolumeChartProps>*/ = () => {
  const chartRef = React.useRef<ChartJS>(null);

  const data = {
    datasets: [
      {
        label: 'Ventricular Pressure-Volume Loop',
        data: [
          [215,123],
          [226,94],
          [243,74],
          [263,66],
          [284,74],
          [307,86],
          [327,96],
          [343,106],
          [358,116],
          [369,129],
          [386,143],
          [399,157],
          [416,170],
          [423,181],
          [423,211],
          [423,232],
          [423,260],
          [423,290],
          [423,320],
          [398,325],
          [365,329],
          [339,332],
          [300,333],
          [269,324],
          [244,314],
          [216,293],
          [213,272],
          [216,245],
          [214,221],
          [214,202],
          [215,179],
          [213,157]
        ],
        pointBackgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderWidth: 2,
        pointHoverRadius: 5,
        showLine: true,
        tension: 0.1,
        fill: false,
      }
    ],
  };

  const options: ChartConfiguration['options'] = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      }
    },
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
      legend: {
        display: false,
      },
      background: {
        beforeDraw: (chart) => {
          if (chartRef.current && backgroundImageUrl) {
            const ctx = chartRef.current.ctx;
            const canvas = chartRef.current.canvas;
            const { top, left, width, height } = chart.chartArea;
            const image = new Image();
            image.src = backgroundImageUrl;
            image.onload = () => {
              ctx.drawImage(image, left, top, width, height);
            };
          }
        }
      }
    },
    elements: {
      point: {
        radius: 4, // Default point radius
        hoverRadius: 6, // Radius on hover
      },
      line: {
        borderWidth: 2,
      }
    },
    onHover: (event, elements: TooltipItem<'line'>[]) => {
      if (elements.length) {
        const index = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        chartRef.current?.setActiveElements([{ datasetIndex, index }]);
        chartRef.current?.update();
      }
    }
  };

  return <Scatter ref={chartRef} data={data} options={options} />;
};

export default PressureVolumeChart;
