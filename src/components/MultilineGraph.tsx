import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import multilineGraphData from '@/data/graph/multilineGraphData.json';


interface PathCoordinates {
    coordinates: { x: number; y: number }[];
    [key: string]: any; // Add index signature
}

const MultilineGraph = () => {

    const ref = useRef<SVGSVGElement | null>(null);
    const allCoordinates = useRef<PathCoordinates>({});

    let maxXValue = findMaxX(multilineGraphData);
    let maxYValue = findMaxY(multilineGraphData);

    const height = maxYValue
    const width = maxXValue
    const margin = { "top": 20, "bottom": 20, "left": 20, "right": 20 }

    //Domain is the range of values for the x and y axis
    //Range is the range of pixels for the x and y axis
    let xScale = d3.scaleLinear()
        .domain([0, maxXValue])
        .range([0, width])

    let yScale = d3.scaleLinear()
        .domain([0, maxYValue])
        .range([0, height])

        useEffect(() => {

    let svg = d3.select(ref.current!)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    let curve = d3.curveCatmullRom.alpha(0.5)

    // Define line generator
    const line = d3.line<{ x: number; y: number }>()
        .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
        .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
        .curve(curve);

    //Add a rect to handle mouse events
    let rect = g.append("rect")
        .attr("width", width - 1) // minus 1 so that it doesn't return an x = width, as the coordinates is 0 based.
        .attr("height", height)
        .style("opacity", 0)
        .on("mousemove", handleMouseMove);

    // Loop through datasets
    multilineGraphData.forEach((graphData, i) => {

        //only single array now
        let lineCoordinates = convertJsonArrayToCoordinates(graphData.coordinates).sort((a, b) => a.x - b.x);;


            let path = g.append("path")
                .datum(lineCoordinates as { x: number; y: number }[]) // Cast lineCoordinates to the correct type
                .attr("d", line)
                .attr("id", graphData.label)
                .attr('fill', 'none')
                .attr('stroke', graphData.color)
                .attr('stroke-width', 1.5)


            let pathNode = path.node();
            let pathNodeLength = pathNode ? Math.round(pathNode.getTotalLength()) : 0;

            allCoordinates.current[graphData.label] = { coordinates: getAllPathCoordinates(pathNode, pathNodeLength) };

        })

    })


    function handleMouseMove(d) {

        let g = d3.select(ref.current).select("g");

        // Remove existing dots
        let mouseX = d3.pointer(d)[0]

        let matchingXcoordinates = findCoordinatesByX(mouseX);

        if (!matchingXcoordinates) { return; }

        matchingXcoordinates.forEach((matchingCoordinate, i) => {

            let dots = g.selectAll(".dot")
                .data([1]) //create one circle for later use
                .enter()
                .append("g")
                .attr("id", "dot-" + matchingCoordinate.lineName)
                .style("opacity", 0)

            dots.append("circle")
                .attr("r", 8)

            const dotsBgdText = dots.append("text")
                .attr("class", "text-bgd")
                .attr("x", 0)

            const dotsText = dots.append("text")
                .attr("class", "text-fgd")
                .attr("x", 0)


            let dotsData = [
                { "cx": matchingCoordinate.x, "cy": matchingCoordinate.y }
            ]

            dots.data(dotsData)
                .attr("transform", function (d) { return "translate(" + d.cx + "," + d.cy + ")" })
                .style("opacity", 1)
                .attr("id", "dot-" + matchingCoordinate.lineName)

            dotsText.data(dotsData)
                .text(function (d) {
                    return roundNumber(yScale.invert(d.cy));
                })
                .attr("y", function (d) {
                    let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
                    return d.cy == maxY ? 27 : -15;
                })
                .attr("id", "dottext-" + matchingCoordinate.lineName);

            dotsBgdText.data(dotsData)
                .text(function (d) {
                    return roundNumber(yScale.invert(d.cy));
                })
                .attr("y", function (d) {
                    let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
                    return d.cy == maxY ? 27 : -15;
                })
                .attr("id", "dotBgdtext-" + matchingCoordinate.lineName);

        })
    }


    function findCoordinatesByX(xValue: number): { x: number; y: number; lineName: string }[] {
        let matchingCoordinates: { x: number; y: number; lineName: string }[] = [];

        if (allCoordinates.current) {
            for (let key in allCoordinates.current) {
                let pathCoordinates = allCoordinates.current[key];
                for (let coordinate of pathCoordinates.coordinates) {
                    if (coordinate.x === xValue) {
                        matchingCoordinates.push({ x: coordinate.x, y: coordinate.y, lineName: key });
                    }
                }
            }
        }

        return matchingCoordinates;
    }

    return <svg ref={ref} width={600} height={459} />;
};

// function handleMouseMove(d) {
//     let mouseX = d3.pointer(d)[0]

//     let matchingXcoordinates = findCoordinatesByX(mouseX);

//     if (!matchingXcoordinates) { return; }

//     matchingXcoordinates.forEach((matchingCoordinate, i) => {

//         let dotsData = [
//             { "cx": matchingCoordinate.x, "cy": matchingCoordinate.y }
//         ]

//         dots.data(dotsData)
//             .attr("transform", function (d) { return "translate(" + d.cx + "," + d.cy + ")" })
//             .style("opacity", 1)

//         dotsText.data(dotsData)
//             .text(function (d) {
//                 return roundNumber(yScale.invert(d.cy));
//             })
//             .attr("y", function (d) {
//                 let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
//                 return d.cy == maxY ? 27 : -15;
//             })

//         dotsBgdText.data(dotsData)
//             .text(function (d) {
//                 return roundNumber(yScale.invert(d.cy));
//             })
//             .attr("y", function (d) {
//                 let maxY = d3.max(dotsData, function (e) { return e.cx == d.cx ? e.cy : 0 })
//                 return d.cy == maxY ? 27 : -15;
//             })
//     })
// }

function roundNumber(n: number) {
    return Math.round(n * 100) / 100
}

function findMaxX(data: any[]) {
    return Math.max(...multilineGraphData.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMaxY(data: any[]) {
    return Math.max(...multilineGraphData.flatMap(line => line.coordinates.map(point => point.y)));
}

function convertJsonArrayToCoordinates(data: any[]) {
    return data.map(item => ({ x: item.x, y: item.y }));
}

function interpolateCoordinateValues(data: any[], pathNode: SVGPathElement | null, pathNodeLength: number, width: number) {
    return data.map(item => ({ x: item.x, y: findY(pathNode, pathNodeLength, item.x, width) }));
}

function getAllPathCoordinates(path: SVGPathElement | null, pathLength: number) {
    let coordinates: { x: number, y: number }[] = [];
    for (let i = 0; i <= pathLength; i++) {
        let pos = path?.getPointAtLength(i);
        if (pos) {
            if (!coordinates.some(coord => coord.x === Math.floor(pos.x))) {
                coordinates.push({ x: Math.floor(pos.x), y: Math.floor(pos.y) });
            }
        }
    }
    return coordinates;
}

//iteratively search a path to get a point close to a desired x coordinate
function findY(path: SVGPathElement | null, pathLength: number, x: number, width: number) {
    const accuracy = 1 //px
    const iterations = Math.ceil(Math.log10(accuracy / width) / Math.log10(0.5));  //for width (w), get the # iterations to get to the desired accuracy, generally 1px
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

export default MultilineGraph;