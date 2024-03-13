import * as d3 from 'd3';
import { useEffect, useRef } from 'react';



const SingleLineGraph = () => {

    const ref = useRef<SVGSVGElement | null>(null);
    
const height = 500
const width = 500
const margin = { "top": 20, "bottom": 20, "left": 20, "right": 20 }

const data = [2, 5, 6, 7, 3, 8, 3, 4];

useEffect(() => {

let xScale =  d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width])

let yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0])

let xAxis = d3.axisBottom(xScale)
let yAxis = d3.axisLeft(yScale)

let curve = d3.curveCatmullRom.alpha(0.5)

let line = d3.line()
    .x(function (d, i) { return xScale(i) })
    .y(function (d) { return yScale(Number(d)) }) // Cast the value to a number
    .curve(curve);

let svg = d3.select(ref.current!)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)


g.append("g").call(yAxis)

let path = g.append("path")
    .datum(data)
    .attr("d", line)

let pathNode = path.node();
let pathNodeLength = pathNode ? pathNode.getTotalLength() : 0;

//for every x coordinate, get the y coordinates for the line
//and store for use later on
let allCoordinates: {}[] = [];
let x = 0;

for (x; x < width; x++) {
    let obj = {}
    obj.y = findY(pathNode, pathNodeLength, x, width)
    allCoordinates.push(obj)
}

let dots = g.selectAll(".dot")
    .data([1]) //create one circle for later use
    .enter()
    .append("g")
    .style("opacity", 0)

dots.append("circle")
    .attr("r", 8)

const dotsBgdText = dots.append("text")
    .attr("class", "text-bgd")
    .attr("x", 0)

const dotsText = dots.append("text")
     .attr("class", "text-fgd")
    .attr("x", 0)
        
//Add a rect to handle mouse events
let rect = g.append("rect")
    .attr("width", width - 1) // minus 1 so that it doesn't return an x = width, as the coordinates is 0 based.
    .attr("height", height)
    .style("opacity", 0)
    .on("mousemove", function (d) {

        let mouseX = d3.pointer(d)[0]

        let closestXValueInallCoordinates = Object.keys(allCoordinates).reduce((prev, curr) => {
            return (Math.abs(Number(curr) - mouseX) < Math.abs(Number(prev) - mouseX) ? curr : prev);
            });

        let dotsData = [
            { "cx": mouseX, "cy": allCoordinates[Number(closestXValueInallCoordinates)].y}
        ]

        dots.data(dotsData)
            .attr("transform", function (d) { return "translate(" + d.cx + "," + d.cy + ")" })
            .style("opacity", 1)

        dotsText.data(dotsData)
            .text(function (d) {
                return roundNumber(yScale.invert(d.cy));
            })
            .attr("y", function (d) {
                let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
                return d.cy == maxY ? 27 : -15;
            })

        dotsBgdText.data(dotsData)
            .text(function (d) {
                return roundNumber(yScale.invert(d.cy));
            })
            .attr("y", function (d) {
                let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
                return d.cy == maxY ? 27 : -15;
            })               

        })

    })

        
  //iteratively search a path to get a point close to a desired x coordinate
function findY(path: SVGPathElement | null, pathLength: number, x: number, width: number) {
    const accuracy = 1 //px
    const iterations = Math.ceil(Math.log10(accuracy/width) / Math.log10(0.5));  //for width (w), get the # iterations to get to the desired accuracy, generally 1px
    let i = 0;
    let nextLengthChange = pathLength / 2;
    let nextLength = pathLength / 2;
    let y = 0;
    for (i; i < iterations; i++) {
        let pos = path?.getPointAtLength(nextLength); // Add null check
        if (pos) {
            y = pos.y;
            nextLength = x < pos.x ? nextLength - nextLengthChange : nextLength + nextLengthChange;
            nextLengthChange = nextLengthChange / 2;
        }
    }
    return y;
}

function roundNumber(n: number) {
    return Math.round(n * 100) / 100
}

return <svg ref={ref} width={520} height={520}/>;
};


export default SingleLineGraph;