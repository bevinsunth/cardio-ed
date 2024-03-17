// import * as datahelper from '@/utils/datahelper';
// import { roundNumber } from '@/utils/datahelper';
// import * as d3 from 'd3';

// export function mouseMoveEvent(svg, allCoordinates, datasets, yScale) {
//   return function (d) {
//     let mouseX = d3.pointer(d)[0]

//     let lines = datasets.map(dataset => {
//       return {
//         "id": dataset.label,
//       }
//     });


//     // Create data for the circles
//     let circlesData = lines.map(line => {
//       return {
//         "cx": mouseX,
//         "cy": allCoordinates[line.id][mouseX].y // replace line.id with the property that identifies the line
//       }
//     });

//     // Select all existing circles and bind the new data
//     let circles = d3.select(this).selectAll("circle").data(circlesData);

//     // For each new data point, append a new circle
//     circles.enter().append("circle")
//       .attr("r", 5) // radius of the circle
//       .attr("fill", "red"); // color of the circle

//     // Update the position of all circles
//     circles.attr("cx", d => d.cx)
//       .attr("cy", d => d.cy);

//     // Remove circles for which there's no data
//     circles.exit().remove();


// //     let dots = svg.selectAll(".dot")
// //     .data([1]) //create one circle for later use
// //     .enter()
// //     .append("g")
// //     .style("opacity", 0)

// // dots.append("circle")
// //     .attr("r", 8)

// // let dotsBgdText = dots.append("text")
// //     .attr("class", "text-bgd")
// //     .attr("x", 0)

// // let dotsText = dots.append("text")
// //      .attr("class", "text-fgd")
// //     .attr("x", 0)

// //     dots.data(circlesData)
// //         .attr("transform", function (d) { return "translate(" + d.cx + "," + d.cy + ")" })
// //         .style("opacity", 1)

// //     dotsText.data(circlesData)
// //         .text(function (d) {
// //             return roundNumber(yScale.invert(d.cy));
// //         })
// //         .attr("y", function (d) {
// //             let maxY = d3.max(circlesData, function (e) { return e.cx == d.cx ? e.cy : 0 })
// //             return d.cy == maxY ? 27 : -15;
// //         })

// //     dotsBgdText.data(circlesData)
// //         .text(function (d) {
// //             return roundNumber(yScale.invert(d.cy));
// //         })
// //         .attr("y", function (d) {
// //             let maxY = d3.max(circlesData, function (e) { return e.cx == d.cx ? e.cy : 0 })
// //             return d.cy == maxY ? 27 : -15;
// //         })               

//       }
//     }