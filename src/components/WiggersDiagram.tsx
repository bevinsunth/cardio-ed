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

import { WiggersDiagramData } from '@/data/graph/WiggersDiagramData';
import { prepareDataset } from '@/utils/datahelper';

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const WiggersDiagram: React.FC = () => {

  const options = {
    scales: {
      x: {
        type: 'linear', // sets the x-axis to linear
        display: false, // hides the x-axis line
      },
      y: {
        type: 'linear', // sets the y-axis to linear
        display: false, // hides the y-axis line
        reverse: true,
      },
    },
    elements: {
      line: {
        tension: 0.25, // sets the line tension
      },
    },
    plugins: {
      legend: {
      display: false,
      position: 'right',
    },
    tooltip: {
      enabled: false,
    },
    customLegend: {
      id: 'customLegend',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        const datasets = chart.data.datasets;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;
      
        // Calculate the maximum x-coordinate among the last points of all datasets
        const maxX = Math.max(...datasets.map(dataset => {
          const lastPoint = dataset.data[dataset.data.length - 1];
          return xAxis.getPixelForValue(lastPoint.x);
        }));
      
        datasets.forEach((dataset, i) => {
          const lastPoint = dataset.data[dataset.data.length - 1];
          const y = yAxis.getPixelForValue(lastPoint.y);
      
          // Draw the label at the maximum x-coordinate and the y-coordinate of the last point
          ctx.fillStyle = dataset.borderColor;
          ctx.fillText(dataset.label, maxX +10, y);
        });
      },
    },
  },
  onHover: (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const chart = chartElement[0].chart;
      const datasets = chart.data.datasets;

      // Highlight the corresponding point in all datasets
      datasets.forEach((dataset) => {
        const meta = chart.getDatasetMeta(dataset.index);
        const element = meta.data[index];

        // Change the point style to highlight it
        element.pointStyle = 'circle';
        element.backgroundColor = 'red';
        element.radius = 5;
      });

      // Update the chart to reflect the changes
      chart.update();
    }
  },
  };

  ChartJS.register(options.plugins.customLegend);

  return <Line width={600} height={459} options={options} data={prepareDataset(WiggersDiagramData)} />;
};

export default WiggersDiagram;
