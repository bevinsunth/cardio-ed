import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import wiggersGraphDataJson from '@/data/graph/multilinewiggersGraphData.json';
import pressureVolumeGraphDataJson from '@/data/graph/multilinepressureVolumeGraphData.json';
import * as graphDataHelper from '@/utils/graphDataHelper';
import * as interfaces from '@/models/interfaces';
import PressureVolumeLoop from './PressureVolumeLoop';




const wiggersGraphData: interfaces.WiggersGraphData = wiggersGraphDataJson;
const pressureVolumeGraphData: interfaces.BaseLineData[] = pressureVolumeGraphDataJson;

let maxXValue = findMaxX(wiggersGraphData.lines);
let maxYValue = findMaxY(wiggersGraphData.lines);
const height = maxYValue
const width = maxXValue

let xScale = d3.scaleLinear()
    .domain([0, maxXValue])
    .range([0, width])

let yScale = d3.scaleLinear()
    .domain([0, maxYValue])
    .range([0, height])


const WiggersDiagram: React.FC<{ pressureVolumeActivePointerData: interfaces.PressureVolumeActivePointerData, setWiggersActivePointerData: (value: interfaces.WiggersActivePointerData) => void }> = ({ pressureVolumeActivePointerData, setWiggersActivePointerData }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const linesRef = useRef<any>(null);
    const circlesRef = useRef<any>(null);

    useEffect(() => {
        let svg = d3.select(ref.current)
            .attr("width", width + 150)
            .attr("height", height)


        // Define line generator
        const line = d3.line<interfaces.Coordinate>()
            .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
            .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
            .curve(d3.curveCardinal)

        var lineGroup = svg.append("g");
        linesRef.current = lineGroup.selectAll(".gLine")
            .data(wiggersGraphData.lines)
            .enter()
            .append("path")
            .attr("class", "gLine")
            .attr("d", function (d) {
                return line(d.coordinates.sort((a, b) => a.x - b.x));
            })
            .attr("stroke", function (d, i) {
                return d.color;
            })
            .attr("fill", "transparent")
            .attr("stroke-width", function (d) {
                return d.lineSize !== undefined ? d.lineSize : 2;
            });

        circlesRef.current = lineGroup.selectAll("circle")
            .data(wiggersGraphData.lines)
            .enter()
            .append("circle")
            .attr("d", function (d) {
                return line(d.coordinates.sort((a, b) => a.x - b.x));
            })
            .attr("opacity", 0)
            .attr("r", function (d) {
                return d.circleSize !== undefined ? d.circleSize : 6;
            })
            .attr("fill", function (d) {
                return d.color;
            });

        const biggestLastX = wiggersGraphData.lines.map(line => line.coordinates[line.coordinates.length - 1].x).sort((a, b) => b - a)[0];
        wiggersGraphData.lines.forEach(graphData => {
            const lableYOffset = graphData.lableYOffset ? graphData.lableYOffset : 0;
            // Get the last data point for the series
            const lastPoint = graphData.coordinates[graphData.coordinates.length - 1];

            // Add legend text using transform for positioning
            svg.append("text")
                .attr("transform", () => {
                    return `translate(${xScale(biggestLastX + 5)}, ${yScale(lastPoint.y + lableYOffset)})`;
                })
                .attr("dy", ".35em") // Adjust for better alignment
                .attr("dx", ".5em") // Offset a bit to the right from the end of the line
                .style("fill", graphData.color) // Match the line color
                .text(graphData.label);
        });



        if (ref && ref.current) {
            ref.current.addEventListener("mousemove", function (d) {

                const sectionCode = wiggersGraphData.sections.find(section => d3.pointer(d)[0] > xScale(section.startXCoordinates) && d3.pointer(d)[0] < xScale(section.endXCoordinates))?.code;
                if (sectionCode) {
                    setWiggersActivePointerData({
                        activeSectionCode: sectionCode,
                        activePointer: d3.pointer(d)
                    });
                }
                handleCircles(d3.pointer(d));

            });
        }

    }, [ref]);

    useEffect(() => {
        if (pressureVolumeActivePointerData && pressureVolumeActivePointerData.activePointer && pressureVolumeActivePointerData.activeLineCode && pressureVolumeActivePointerData.activePointer.length > 0) {

            const targetSection = wiggersGraphData.sections.find(section => section.code === pressureVolumeActivePointerData.activeLineCode);
            const targetLength = targetSection ? targetSection.endXCoordinates - targetSection.startXCoordinates : maxXValue;
            const sourceLength = pressureVolumeActivePointerData.activeLineLength;
            const sourceLinePoint = pressureVolumeActivePointerData.pointOnActiveLine;

            if (targetSection === undefined) return;

            const targetLinePoint = graphDataHelper.mapLinePointToTargetLine(sourceLength, targetLength, sourceLinePoint);

            handleCircles([xScale(targetSection.startXCoordinates + targetLinePoint), yScale(0)]);
        }
    }, [pressureVolumeActivePointerData]);



    function handleCircles(pointer: [number, number]) {
        let targetX = pointer[0];

        linesRef.current.nodes().forEach((_lineNode: any, i: any) => {

            // let precision = 1
            // let startLength = 0;
            // let endLength = _lineNode.getTotalLength();
            // let point = _lineNode.getPointAtLength((startLength + endLength) / 2);
            // let iterations = 0;

            // // Increase precision for a closer match. Decrease it for faster, but less precise results.
            // precision = precision || 0.1;

            // // Binary search for a point with the given x coordinate within the specified precision
            // while (Math.abs(point.x - targetX) > precision && iterations < 100) {
            //     if (point.x < targetX) {
            //         startLength = (startLength + endLength) / 2;
            //     } else {
            //         endLength = (startLength + endLength) / 2;
            //     }
            //     point = _lineNode.getPointAtLength((startLength + endLength) / 2);
            //     iterations++;
            // }

            let intersection = findYIntersectionPoint(_lineNode, targetX);
            if (!intersection) return;

            circlesRef.current.filter(function (_circle: any, index: number) {
                return i == index;
            })
                .attr("opacity", 1)
                .attr("cx", () => intersection.x)
                .attr("cy", () => intersection.y);
        });
    }

    return <svg ref={ref} />;
};

function findYIntersectionPoint(pathNode: any, x: number) {
    let pathLength = pathNode.getTotalLength();
    let precision = 1;
  
    for (let i = 0; i <= pathLength; i += precision) {
      let point = pathNode.getPointAtLength(i);
  
      if (Math.abs(point.x - x) < precision) {
        return point;
      }
    }
    return null;
  }


function findMaxX(data: any[]) {
    return Math.max(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMaxY(data: any[]) {
    return Math.max(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.y)));
}


export default WiggersDiagram;