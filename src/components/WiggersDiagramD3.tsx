import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from '@/data/graph/WiggersDiagramData.json';

const WiggersDiagram = () => {
  const ref = useRef();

  useEffect(() => {

        // Define margins
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
// Adjust width and height
const width = 600 - margin.left - margin.right;
const height = 459 - margin.top - margin.bottom;
// Create SVG and g elements
const svg = d3.select(ref.current)
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);


    // Define scales
    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();

    // Define line generator
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX); // apply smoothing to the line
      // Prepare data
      console.log(data);
      const dataset = data;


      xScale.domain(d3.extent(dataset, d => d.x)).range([0, width]);
      yScale.domain([d3.max(dataset, d => d.y), 0]).range([height, 0]);

      // Add line to SVG
      svg.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);


// Create a circle that will move along the line
const focus = svg.append("g")
    .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 8.5)
        .style("opacity", 0);

// Create a rect on top of the svg area: this rectangle recovers mouse position
svg.append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', () => focus.style("opacity", 1))
    .on('mouseout', () => focus.style("opacity", 0))
    .on('mousemove', mousemove);

function mousemove(event) {
    // recover coordinate we need
    const x0 = xScale.invert(d3.pointer(event)[0]);
    const i = d3.bisector(d => d.x).left(data, x0, 1);
    const selectedData = data[i];
    focus
        .attr("cx", xScale(selectedData.x))
        .attr("cy", yScale(selectedData.y));
}


  }, []);

  return <svg ref={ref} style={{width: 600, height: 459}} />;
};

export default WiggersDiagram;