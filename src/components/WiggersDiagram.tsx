import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import multilineGraphData from '@/data/graph/multilinewiggersGraphData.json';

type Coordinate = {
    x: number;
    y: number;
};

type GraphData = {
    label: string;
    coordinates: Coordinate[];
    color: string;
}[];


interface PathCoordinates {
    coordinates: { x: number; y: number }[];
    [key: string]: any; // Add index signature
}

let maxXValue = findMaxX(multilineGraphData);
let maxYValue = findMaxY(multilineGraphData);
const height = maxYValue
const width = maxXValue

const biggestFirstX = multilineGraphData.map(line => line.coordinates[0].x).sort((a, b) => b - a)[0];

let xScale = d3.scaleLinear()
    .domain([biggestFirstX, maxXValue])
    .range([0, width])

let yScale = d3.scaleLinear()
    .domain([0, maxYValue])
    .range([0, height])


const WiggersDiagram: React.FC<{ pressureVolumeLoopPointer:any, setWiggersDiagramPointer:(value: any) => void }> = ({pressureVolumeLoopPointer, setWiggersDiagramPointer}) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const linesRef = useRef<any>(null);
    const circlesRef = useRef<any>(null);

    useEffect(() => {
        let svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)


        // Define line generator
        const line = d3.line<Coordinate>()
            .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
            .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
            .curve(d3.curveCardinal)

        var lineGroup = svg.append("g");


        linesRef.current = lineGroup.selectAll(".gLine")
            .data(multilineGraphData)
            .enter()
            .append("path")
            .attr("class", "gLine")
            .attr("d", function (d) {
                return line(d.coordinates.sort((a, b) => a.x - b.x));
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
                return line(d.coordinates.sort((a, b) => a.x - b.x));
            })
            //.attr("opacity", 0)
            .attr("r", 6)
            .attr("fill", function (d, i) {
                return multilineGraphData[i].color;
            });


        if (ref && ref.current) {
            ref.current.addEventListener("mousemove", function (d) {

                setWiggersDiagramPointer(d3.pointer(d));
                handleCircles(d3.pointer(d));

            });
        }

    }, [ref]);

    useEffect(() => {
        if (pressureVolumeLoopPointer) {
            handleCircles(pressureVolumeLoopPointer);
        }
    }, [pressureVolumeLoopPointer]);

    function handleCircles(pointer: [number, number]) {
        let mouseX = pointer[0];

        linesRef.current.nodes().forEach((_lineNode: any, i: any) => {
            var pathEl = _lineNode;
            var pathLength = pathEl.getTotalLength();
            var beginning = mouseX, end = pathLength, target, pos: DOMPoint;

            while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = pathEl.getPointAtLength(target);
                if ((target === end || target === beginning) && Math.floor(pos.x) !== mouseX) {
                    break;
                }
                if (Math.floor(pos.x) > mouseX) {
                    end = target;
                } else if (Math.floor(pos.x) < mouseX) {
                    beginning = target;
                } else {
                    break; //position found
                }
            }

            circlesRef.current.filter(function (_circle:any, index:number) {
                return i == index;
            })
                .attr("opacity", 1)
                .attr("cx", () => mouseX)
                .attr("cy", () => pos.y);
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


export default WiggersDiagram;