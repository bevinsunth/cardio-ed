// import * as d3 from 'd3';
// import * as datahelper from '@/utils/datahelper';
// import * as drawhelper from '@/utils/drawhelper';

// export function drawLineD3(data, allCoordinates, svg, width, height, margin, xScale, yScale, lineId) {

//     //const allCoordinates = useRef();

//     // let xScale = d3.scaleLinear()
//     //     .domain([0, data.length - 1])
//     //     .range([0, width])

//     // let yScale = d3.scaleLinear()
//     //     .domain([0, 10])
//     //     .range([height, 0])

//     let xAxis = d3.axisBottom(xScale)
//     let yAxis = d3.axisLeft(yScale)

//     let curve = d3.curveCatmullRom.alpha(0.5)

//                     // Define line generator
//                     const line = d3.line()
//                       .x(d => xScale(d.x))
//                       .y(d => yScale(d.y))
//                       .curve(d3.curveMonotoneX);

//     let g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//     g.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)

//     g.append("g").call(yAxis)


//     // let path = g.append("path")
//     //     .datum(data)
//     //     .attr("d", line)

//         let path =     g.append('path')
//         .datum(data)
//         .attr('fill', 'none')
//         .attr('stroke', 'steelblue')
//         .attr('stroke-width', 1.5)
//         .attr('d', line)
//         .attr('id', function(d, i) {
//             return lineId; // This will assign IDs like 'line-0', 'line-1', etc.
//           });

//     // Add styles for path
// // svg.selectAll('path')
// // .style('stroke', 'black')
// // .style('fill', 'none');

// // // Add styles for .text-bgd
// // svg.selectAll('.text-bgd')
// // .style('stroke', 'white')
// // .style('fill', 'white')
// // .style('stroke-width', '3')
// // .style('text-anchor', 'middle');

// // // Add styles for .text-fgd
// // svg.selectAll('.text-fgd')
// // .style('stroke', 'none')
// // .style('text-anchor', 'middle');

// drawhelper.calculateAndAddYCoordinatesToArray(allCoordinates, path, width, lineId)

//     // let dots = g.selectAll(".dot")
//     //     .data([1]) //create one circle for later use
//     //     .enter()
//     //     .append("g")
//     //     .style("opacity", 0)

//     // dots.append("circle")
//     //     .attr("r", 8)

//     // let dotsBgdText = dots.append("text")
//     //     .attr("class", "text-bgd")
//     //     .attr("x", 0)

//     // let dotsText = dots.append("text")
//     //     .attr("class", "text-fgd")
//     //     .attr("x", 0)
            
//     //Add a rect to handle mouse events
//     // let rect = g.append("rect")
//     //     .attr("width", width - 1) // minus 1 so that it doesn't return an x = width, as the coordinates is 0 based.
//     //     .attr("height", height)
//     //     .style("opacity", 0)
//     //     .on("mousemove", function (d) {

//     //         let mouseX = d3.pointer(d)[0]

//     //         let dotsData = [
//     //             { "cx": mouseX, "cy": allCoordinates[mouseX].y}
//     //         ]

//     //         dots.data(dotsData)
//     //             .attr("transform", function (d) { return "translate(" + d.cx + "," + d.cy + ")" })
//     //             .style("opacity", 1)

//     //         dotsText.data(dotsData)
//     //             .text(function (d) {
//     //                 return datahelper.roundNumber(yScale.invert(d.cy));
//     //             })
//     //             .attr("y", function (d) {
//     //                 let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
//     //                 return d.cy == maxY ? 27 : -15;
//     //             })

//     //         dotsBgdText.data(dotsData)
//     //             .text(function (d) {
//     //                 return datahelper.roundNumber(yScale.invert(d.cy));
//     //             })
//     //             .attr("y", function (d) {
//     //                 let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
//     //                 return d.cy == maxY ? 27 : -15;
//     //             })               

//     //     })

//     return allCoordinates;
// }

