import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import multilineGraphData from '@/data/graph/multilinepressureVolumeGraphData.json';

type Coordinate = {
    x: number;
    y: number;
};

type GraphData = {
    label: string;
    coordinates: Coordinate[];
    color: string;
}[];


// // Define your margins
// const margin = { top: 10, right: 50, bottom: 30, left: 40 };

let maxXValue = findMaxX(multilineGraphData);
let maxYValue = findMaxY(multilineGraphData);
const height = 490;
const width = 500;

// const smallestFirstX = multilineGraphData.map(line => line.coordinates[0].x).sort((a, b) => a - b)[0];

let xScale = d3.scaleLinear()
    .domain([0 , maxXValue])
    .range([0, width])

let yScale = d3.scaleLinear()
    .domain([0, maxYValue])
    .range([0, height])


const PressureVolumeLoop: React.FC<{ wiggersDiagramPointer: any, setPressureLoopPointer: (value: any) => void }> = ({ wiggersDiagramPointer, setPressureLoopPointer }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const linesRef = useRef<any>(null);
    const circlesRef = useRef<any>(null);

    useEffect(() => {

        let svg = d3.select(ref.current)
            .attr("width", width + 30)
            .attr("height", height + 30)

        // Define line generator
        const line = d3.line<Coordinate>()
            .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
            .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
            .curve(d3.curveMonotoneX)

        var lineGroup = svg.append("g")
            .attr("transform", "translate(" + 10 + "," + 0 + ")");

        linesRef.current = lineGroup.selectAll(".gLine")
            .data(multilineGraphData)
            .enter()
            .append("path")
            .attr("class", "gLine")
            .attr("d", function (d) {
                return line(d.coordinates);
            })
            .attr("stroke", function (d, i) {
                return multilineGraphData[i].color;
            })
            .attr("fill", "transparent")
            .attr("stroke-width", "2px");

        circlesRef.current = lineGroup.selectAll("circle")
            .data(multilineGraphData)
            .enter()
            .append("circle")
            .attr("d", function (d) {
                return line(d.coordinates);
            })
            .attr("r", 6)
            .attr("opacity", 0)
            .attr("fill", function (d, i) {
                return multilineGraphData[i].color;
            });


        if (ref && ref.current) {
            ref.current.addEventListener("mousemove", function (d) {
                let pointer = d3.pointer(d);

                setPressureLoopPointer(pointer);
                handleCircles(pointer);

            });
        }

    }, [ref]);

    useEffect(() => {
        if (wiggersDiagramPointer) {
            handleCircles(wiggersDiagramPointer);
        }
    }, [wiggersDiagramPointer]);


    function handleCircles(pointer: [number, number]) {

        let minDist = 50; // initialize minimum distance to trigger hover
        let closestPoint: 0; // initialize closest point
        let closestLineIndex: number; // initialize index of the closest line
        let lastClosestLineDistance = Infinity; // initialize index of the closest line

        linesRef.current.nodes().forEach((_lineNode: any, i: any) => {
            var pathEl = _lineNode;
            var pathLength = pathEl.getTotalLength();

            for (let p = 0; p < pathLength; p++) {
                let point = pathEl.getPointAtLength(p);
                let dist = Math.sqrt(Math.pow(point.x - pointer[0], 2) + Math.pow(point.y - pointer[1], 2));
                if (dist < minDist && dist < lastClosestLineDistance) {
                    minDist = dist;
                    closestPoint = point;
                    closestLineIndex = i;
                    lastClosestLineDistance = dist;
                }
            }

            if (closestPoint) {
                circlesRef.current.nodes().forEach((circle: any, i: number) => {
                    if (i === closestLineIndex) {
                        d3.select(circle)
                            .attr("opacity", 1)
                            .attr("cx", () => closestPoint.x)
                            .attr("cy", () => closestPoint.y);
                    } else {
                        d3.select(circle)
                            .attr("opacity", 0); // hide other circles
                    }
                });
            }
        });
    }



    return <svg ref={ref} />;
};


function findMaxX(data: any[]) {
    return Math.max(...multilineGraphData.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMaxY(data: any[]) {
    return Math.max(...multilineGraphData.flatMap(line => line.coordinates.map(point => point.y)));
}


// function getAllPathCoordinates(path: SVGPathElement | null, pathLength: number) {
//     let coordinates: { x: number, y: number }[] = [];
//     for (let i = 0; i <= pathLength; i++) {
//         let pos = path?.getPointAtLength(i);
//         if (pos) {
//             if (!coordinates.some(coord => coord.x === Math.floor(pos?.x!))) {
//                 coordinates.push({ x: Math.floor(pos?.x!), y: Math.floor(pos?.y!) });
//             }
//         }
//     }
//     return coordinates;
// }


export default PressureVolumeLoop;