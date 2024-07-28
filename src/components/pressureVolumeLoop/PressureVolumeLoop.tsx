import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { quadtree } from 'd3';
import pressureVolumeGraphDataJson from '@/components/shared/data/pressureVolumeLoop.json';
import wiggersGraphDataJson from '@/components/shared/data/wiggersDiagram.json';
import * as interfaces from '@/components/shared/types';
import * as styles from '@/components/shared/styles';
import * as graphDataHelper from '@/utils/graphDataHelper';


const wiggersGraphData: interfaces.WiggersGraphData = wiggersGraphDataJson;
const pressureVolumeGraphData: interfaces.BaseLineData[] = pressureVolumeGraphDataJson;


// // Define your margins
// const margin = { top: 10, right: 50, bottom: 30, left: 40 };

let maxXValue = findMaxX(pressureVolumeGraphData);
let maxYValue = findMaxY(pressureVolumeGraphData);
let minXValue = findMinX(pressureVolumeGraphData);
let minYValue = findMinY(pressureVolumeGraphData);

// const smallestFirstX = pressureVolumeGraphData.map(line => line.coordinates[0].x).sort((a, b) => a - b)[0];


const PressureVolumeLoop: React.FC<{ wiggersActivePointerData: interfaces.WiggersActivePointerData | null, setPressureVolumeActivePointerData: (value: interfaces.PressureVolumeActivePointerData) => void }> = ({ wiggersActivePointerData, setPressureVolumeActivePointerData }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const linesCacheRef = useRef<interfaces.LineCache[]>([]);
    const linesRef = useRef<any>(null);
    const circlesRef = useRef<any>(null);
    const activeLineCodeRef = useRef<string | null>(null);

    

    const svgDimensions = { width: 856, height: 840 };
    const padding = 50;

    let xScale = d3.scaleLinear()
        .domain([minXValue, maxXValue])
        .range([padding, svgDimensions.width - padding]);

    let yScale = d3.scaleLinear()
        .domain([minYValue, maxYValue])
        .range([padding, svgDimensions.height - padding]);



    useEffect(() => {

        // const width = divRef.current ? divRef.current.offsetWidth : 0;
        // const height = divRef.current ? divRef.current.offsetHeight : 0;
        // const aspectRatio = svgDimensions.width / svgDimensions.height;

        
        


        let svg = d3.select(svgRef.current)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", `0 0 ${svgDimensions.width + padding * 2} ${svgDimensions.height + padding * 2}`)
            .attr("width", svgDimensions.width + padding * 2)
            .attr("height", svgDimensions.height+ padding * 2);

                    // Append the title text above the SVG
        svg.append('text')
        .attr('class', 'title')
        .attr('x', svgDimensions.width / 2)
        .attr('y', 30) // Position the title above the SVG
        .attr('text-anchor', 'middle')
        .style('font-size', '40px')
        .text('Pressure Loop Diagram');

            // svg.append('text')
            // .attr('class', 'title')
            // .attr('x', svgDimensions.width / 2 + 20)
            // .attr('y', svgDimensions.height + 40)
            // .attr('text-anchor', 'middle')
            // .style('font-size', '40')
            // .text('Pressure Loop Diagram');

            // Assuming svg is your D3 selection for the chart
const axisTitleStyle = {
  fontSize: '25px',
  fontWeight: 'italic',
  fontFamily: 'Arial, sans-serif',
};


svg.append("text")             
.attr('x', svgDimensions.width / 2)
.attr('y', (svgDimensions.height - padding / 2) + 20)
.style("text-anchor", "middle")
.style('font-size', axisTitleStyle.fontSize)
.style('font-weight', axisTitleStyle.fontWeight)
.style('font-family', axisTitleStyle.fontFamily)
.style('fill', 'rgb(129, 133, 137)')
.text("Left Ventricle Volume (mL)");

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", (padding / 2) - 25)
.attr("x", (0 - (svgDimensions.height / 2)))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style('font-size', axisTitleStyle.fontSize)
.style('font-weight', axisTitleStyle.fontWeight)
.style('font-family', axisTitleStyle.fontFamily)
.style('fill', 'rgb(129, 133, 137)')
.text("Left Ventricle Pressure (mmHg)");

        // Define line generator
        const line = d3.line<interfaces.Coordinate>()
            .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
            .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
            .curve(d3.curveMonotoneX)

        var lineGroup = svg.append("g")
        //.attr("transform", "translate(" + 0 + "," + 0 + ")");

        linesRef.current = lineGroup.selectAll(".gLine")
            .data(pressureVolumeGraphData)
            .enter()
            .append("path")
            .attr("class", "gLine")
            .attr("d", function (d) {
                return line(d.coordinates);
            })
            .attr("stroke", function (d, i) {
                return d.color;
            })
            .attr("fill", "transparent")
            .attr("stroke-width", "8px");


        if (linesRef.current) {

            linesRef.current.nodes().forEach((lineNode: any, index: number) => {
                let pathLength = lineNode.getTotalLength();
                let precision = 1;
                let lineCoordinates = [];

                for (let i = 0; i <= pathLength; i += precision) {
                    let point = lineNode.getPointAtLength(i);
                    point.x = Math.floor(point.x);
                    point.y = Math.floor(point.y);
                    lineCoordinates.push(point);
                }

                linesCacheRef.current[index] = {
                    code: lineNode.__data__.code,
                    coordinates: lineCoordinates
                };


                //Append a circle to the start coordinates of each line
                let circle = svg.append("circle")
                    .attr("cx", lineCoordinates[0].x)
                    .attr("cy", lineCoordinates[0].y)
                    .attr("r", 4) // radius of the circle
                    .style("fill", "rgba(255, 99, 132, 1)") // color of the circle
                    .lower();
            });
        }

        circlesRef.current = lineGroup.selectAll("circle")
            .data(pressureVolumeGraphData)
            .enter()
            .append("circle")
            .attr("d", function (d) {
                return line(d.coordinates);
            })
            .attr("r", 15)
            .attr("opacity", 0)
            .attr("fill", "rgb(54, 69, 79)")
            .attr("stroke", function(d) { return d.color; }) // Outline color
            .attr("stroke-width", 4); // Outline width


        if (svg && svgRef.current) {
            svgRef.current.addEventListener("mousemove", function (d) {
                let pointer = d3.pointer(d);

                let { closestPoint, closestLineCode } = getClosestPointer(pointer);
                if (closestPoint && closestLineCode) {
                    let activeNode = linesRef.current.nodes().find((node: any) => node.__data__.code === closestLineCode);
                    drawCircleOnLine(closestPoint, closestLineCode);
                    let activeLineLength = activeNode.getTotalLength();
                    let pointOnActiveLine = getLengthAtPoint(activeNode, pointer[0], pointer[1]);
                    setPressureVolumeActivePointerData({
                        activeLineCode: closestLineCode,
                        activeLineLength: activeLineLength,
                        pointOnActiveLine: pointOnActiveLine,
                        activePointer: [pointer[0], pointer[1]]
                    });
                    if (activeLineCodeRef.current !== closestLineCode) {
                        activeLineCodeRef.current = closestLineCode;
                    }
                }
            });
        }

    }, [svgRef]);


    useEffect(() => {
        if (wiggersActivePointerData && wiggersActivePointerData.activePointer && wiggersActivePointerData.activeSectionCode && wiggersActivePointerData.activePointer.length > 0) {
            const wiggerSection = wiggersGraphData.sections.find(section => section.code === wiggersActivePointerData.activeSectionCode);
            const pressureLoopNode = linesRef.current.nodes().find((node: any) => node.__data__.code === wiggersActivePointerData.activeSectionCode);
            const targetLength = pressureLoopNode ? pressureLoopNode.getTotalLength() : 0;
            const sourceLength = wiggerSection ? wiggerSection.endXCoordinates - wiggerSection.startXCoordinates : maxXValue;

            if (wiggerSection === undefined || pressureLoopNode === undefined) return;

            const sourceLinePoint = wiggersActivePointerData.activePointer[0] - wiggerSection.startXCoordinates;
            let targetLinePoint = graphDataHelper.mapLinePointToTargetLine(sourceLength, targetLength, sourceLinePoint);
            let selectedPoint = pressureLoopNode.getPointAtLength(targetLinePoint);
            drawCircleOnLine(selectedPoint, pressureLoopNode.__data__.code);

            setPressureVolumeActivePointerData({
                activeLineCode: pressureLoopNode.__data__.code,
                activeLineLength: targetLength,
                pointOnActiveLine: targetLinePoint,
                activePointer: selectedPoint ? [selectedPoint.x, selectedPoint.y] : [0, 0]
            });
        }
    }, [wiggersActivePointerData]);

    function getLengthAtPoint(pathNode: any, x: number, y: number) {
        let pathLength = pathNode.getTotalLength();
        let precision = 1;
        let bestLength = 0;
        let bestDistance = Infinity;

        for (let i = 0; i <= pathLength; i += precision) {
            let point = pathNode.getPointAtLength(i);
            let distance = Math.hypot(point.x - x, point.y - y);

            if (distance < bestDistance) {
                bestLength = i;
                bestDistance = distance;
            }
        }

        return bestLength;
    }


    function getClosestPointer(pointer: [number, number]) {

        let minDist = 50; // initialize minimum distance to trigger hover
        let closestPoint: { x: number, y: number } | null = null; // initialize closest point
        let closestLineCode: string | null = null; // initialize index of the closest line
        let lastClosestLineDistance = Infinity; // initialize index of the closest line

        let closestNodeCode = findClosestNodes({ x: pointer[0], y: pointer[1] }, pressureVolumeGraphData);

        linesRef.current.nodes().forEach((_lineNode: any, i: any) => {

            if (!closestNodeCode || !closestNodeCode.includes(_lineNode.__data__.code)) return;

            let lineCache = linesCacheRef.current.find(line => line.code === _lineNode.__data__.code);
            if (!lineCache) return;

            var pathEl = _lineNode;
            var pathLength = pathEl.getTotalLength();

            let interval = 1; // Adjust this value to trade off between speed and accuracy



            // for (let p = 0; p < pathLength; p += interval) {
            //     let point = pathEl.getPointAtLength(p);
            //     let dist = Math.sqrt(Math.pow(point.x - pointer[0], 2) + Math.pow(point.y - pointer[1], 2));
            //     if (dist < minDist && dist < lastClosestLineDistance) {
            //         minDist = dist;
            //         closestPoint = point;
            //         closestLineCode = _lineNode.__data__.code;
            //         lastClosestLineDistance = dist;
            //     }
            // }

            for (let p = 0; p < lineCache.coordinates.length; p++) {
                let point = lineCache.coordinates[p];
                let dist = Math.sqrt(Math.pow(point.x - pointer[0], 2) + Math.pow(point.y - pointer[1], 2));
                if (dist < minDist && dist < lastClosestLineDistance) {
                    minDist = dist;
                    closestPoint = point;
                    closestLineCode = lineCache.code;
                    lastClosestLineDistance = dist;
                }
            }

        });
        return { closestPoint, closestLineCode };
    }

    function drawCircleOnLine(pointer: { x: number, y: number }, lineCode: string) {
        if (pointer) {
            circlesRef.current.nodes().forEach((_circle: any, i: number) => {
                if (_circle.__data__.code === lineCode) {
                    d3.select(_circle)
                        .attr("opacity", 1)
                        .attr("cx", () => pointer.x)
                        .attr("cy", () => pointer.y);
                } else {
                    d3.select(_circle)
                        .attr("opacity", 0); // hide other circles
                }
            });
        }
    }

    function findClosestNodes(pointer: { x: number, y: number }, lines: interfaces.BaseLineData[]) {
        // Flatten the path data and associate each point with its path
        let points = lines.flatMap((line) => line.coordinates.map(point => ({ x: point.x, y: point.y, code: line.code })));

        // Create the quadtree
        let tree = quadtree()
            .x(d => d[0])
            .y(d => d[1])
            .addAll(points.map(point => [point.x, point.y]));

        // Find the closest point
        let closestPoint = tree.find(pointer.x, pointer.y);

        let matchingPoints = points.filter(point => point.x === (closestPoint as [number, number])[0] && point.y === (closestPoint as [number, number])[1]);
        if (matchingPoints.length > 0) {
            return matchingPoints.flatMap(point => point.code);
        }
        else {
            return null;
        }
    }



    return (
        <div style={styles.svgContainer}>
            <svg ref={svgRef} style={styles.svgContentResponsive} />
        </div>
    );
};


function findMaxX(data: any[]) {
    return Math.max(...pressureVolumeGraphData.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMaxY(data: any[]) {
    return Math.max(...pressureVolumeGraphData.flatMap(line => line.coordinates.map(point => point.y)));
}

function findMinX(data: any[]) {
    return Math.min(...pressureVolumeGraphData.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMinY(data: any[]) {
    return Math.min(...pressureVolumeGraphData.flatMap(line => line.coordinates.map(point => point.y)));
}


export default PressureVolumeLoop;