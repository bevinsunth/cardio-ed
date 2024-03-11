import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import * as chartHelpers from "chart.js/helpers";
import { Chart, Line, getElementAtEvent } from 'react-chartjs-2';

import { WiggersDiagramData } from '@/data/graph/WiggersDiagramData';
import { prepareDataset } from '@/utils/datahelper';

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const WiggersDiagram: React.FC = () => {

  const chartRef = useRef(null);

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
      enabled: true,
      mode: 'index',
      intersect: true,
      callbacks: {
        label: function(context) {
          var label = context.dataset.label || '';

          if (context.parsed.y !== null) {
            label += ': ' + context.parsed.y;
          }
          return label;
        },
        title: function(context) {
          return context[0].label;
        }
      }
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
          ctx.fillText(dataset.label, maxX -50, y);
        });
      },
    },
  },
  events: ['mousemove', 'mouseout'],
  onHover: (event) => {
  //   const chart = chartRef.current;
  //   if (chartRef.current && event) {
  //     const elements = chart.getElementsAtEventForMode(event, 'index', { intersect: true }, true);
  
  //   if (elements?.length) {
  //     const element = elements.find(el => el.elementType === 'line');
  //     if (!element) return;
  //     const { datasetIndex, index } = element[0];
  //     const x = chart.scales.x.getValueForPixel(event.x);
  //     const y = chart.scales.y.getValueForPixel(event.y);
  
  //     // Draw a circle over the coordinates
  //     chart.data.datasets[datasetIndex].pointRadius[index] = 5;
  
  //     // Find all other dataset lines with the same x coordinate
  //     const elementsAtSameX = chart.getElementsAtXAxis(event);
  
  //     elementsAtSameX.forEach(el => {
  //       if (el.datasetIndex !== datasetIndex) {
  //         // Draw a circle over the y coordinate where the x intersects y
  //         chart.data.datasets[el.datasetIndex].pointRadius[el.index] = 5;
  //       }
  //     });
  
  //     chart.update();
  //   } else {
  //     // Reset pointRadius to default when not hovering over a point
  //     chart.data.datasets.forEach(dataset => {
  //       dataset.pointRadius = 1; // reset to your default pointRadius
  //     });
  
  //     chart.update();
  //   }
  // }

  const chart = chartRef.current;
  if (chart && event) {
    const canvasPosition = chartHelpers.getRelativePosition(event, chart);
    const xIndex = chart.scales['x'].getValueForPixel(canvasPosition.x);
  
    // Interpolate the y value for the given x
    const dataset = chart.data.datasets[0]; // Assuming you're interested in the first dataset
    const x1 = dataset.data[xIndex - 1].x;
    const y1 = dataset.data[xIndex - 1].y;
    const x2 = dataset.data[xIndex].x;
    const y2 = dataset.data[xIndex].y;
  
    const interpolatedY = y1 + ((canvasPosition.x - x1) * (y2 - y1)) / (x2 - x1);
  
    console.log(`x: ${canvasPosition.x}, y: ${interpolatedY}`);
  }

  },

  };

  ChartJS.register(options.plugins.customLegend);

  
  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log('ChartJS', chart);
    }
  }, []);

  return <Chart ref={chartRef} type='line' data={prepareDataset(WiggersDiagramData)} options={options} width={600} height={459}/>;
};

export default WiggersDiagram;
