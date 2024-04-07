import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import wiggersGraphDataJson from '@/components/shared/Data/wiggersDiagram.json';
import * as graphDataHelper from '@/utils/graphDataHelper';
import * as interfaces from '@/components/Shared/types';
import * as styles from '@/components/Shared/styles';




const wiggersGraphData: interfaces.WiggersGraphData = wiggersGraphDataJson;

let minXValue = findMinX(wiggersGraphData.lines);
let maxXValue = findMaxX(wiggersGraphData.lines);
let maxYValue = findMaxY(wiggersGraphData.lines);
let minYValue = findMinY(wiggersGraphData.lines);





const WiggersDiagram: React.FC<{ pressureVolumeActivePointerData: interfaces.PressureVolumeActivePointerData | null, setWiggersActivePointerData: (value: interfaces.WiggersActivePointerData) => void }> = ({ pressureVolumeActivePointerData, setWiggersActivePointerData }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const linesCacheRef = useRef<interfaces.LineCache[]>([]);
    const linesRef = useRef<any>(null);
    const circlesRef = useRef<any>(null);
    const overlaysRef = useRef<any>(null);

    const svgDimensions = { width: 1671, height: 1280 };
    const padding = 20;

    let xScale = d3.scaleLinear()
        .domain([minXValue, maxXValue])
        .range([padding, svgDimensions.width - padding]);

    let yScale = d3.scaleLinear()
        .domain([minYValue, maxYValue])
        .range([padding, svgDimensions.height - padding]);
    

    useEffect(() => {


        let svg = d3.select(svgRef.current)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", `0 0 ${svgDimensions.width + padding * 2} ${svgDimensions.height + padding * 2}`)
            .attr("width", svgDimensions.width + padding * 2)
            .attr("height", svgDimensions.height+ padding * 2);
            


        // Define line generator
        const line = d3.line<interfaces.Coordinate>()
            .x(d => xScale(d.x)) // Access the correct property for the x-coordinate
            .y(d => yScale(d.y)) // Access the correct property for the y-coordinate
            .curve(d3.curveBasis); // Apply smoothing to the line

        let sectionGroup = svg.append("g");

        overlaysRef.current = sectionGroup.selectAll("rect")
            .data(wiggersGraphData.sections)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.startXCoordinates))
            .attr("y", 0)
            .attr("width", d => xScale(d.endXCoordinates) - xScale(d.startXCoordinates))
            .attr("height", svgDimensions.height)
            .attr("fill", "transparent");

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
            });
        }

        circlesRef.current = lineGroup.selectAll("circle")
            .data(wiggersGraphData.lines)
            .enter()
            .append("circle")
            .attr("d", function (d) {
                return line(d.coordinates.sort((a, b) => a.x - b.x));
            })
            .attr("opacity", 0)
            .attr("r", function (d) {
                return d.circleSize !== undefined ? d.circleSize : 15;
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
                .text(graphData.label)
                .attr("font-size", "50px");;
        });



        if (svgRef && svgRef.current) {
            svgRef.current.addEventListener("mousemove", function (d) {
                let [pointerX, pointerY] = d3.pointer(d);
                let invertedX = xScale.invert(pointerX);
                let invertedY = yScale.invert(pointerY);
                handleCircles([invertedX, invertedY]);
                handleOverlays([invertedX, invertedY]);
                const sectionCode = wiggersGraphData.sections.find(section => d3.pointer(d)[0] > xScale(section.startXCoordinates) && d3.pointer(d)[0] < xScale(section.endXCoordinates))?.code;
                if (sectionCode) {
                    setWiggersActivePointerData({
                        activeSectionCode: sectionCode,
                        activePointer: [invertedX, invertedY]
                    });
                }

            });
        }

    }, [svgRef]);

    useEffect(() => {
        if (pressureVolumeActivePointerData && pressureVolumeActivePointerData.activePointer && pressureVolumeActivePointerData.activeLineCode && pressureVolumeActivePointerData.activePointer.length > 0) {

            const targetSection = wiggersGraphData.sections.find(section => section.code === pressureVolumeActivePointerData.activeLineCode);
            const targetLength = targetSection ? targetSection.endXCoordinates - targetSection.startXCoordinates : maxXValue;
            const sourceLength = pressureVolumeActivePointerData.activeLineLength;
            const sourceLinePoint = pressureVolumeActivePointerData.pointOnActiveLine;

            if (targetSection === undefined) return;

            const targetLinePoint = graphDataHelper.mapLinePointToTargetLine(sourceLength, targetLength, sourceLinePoint);

            handleCircles([targetSection.startXCoordinates + targetLinePoint, 0]);
            handleOverlays([targetSection.startXCoordinates + targetLinePoint, 0]);
        }
    }, [pressureVolumeActivePointerData]);



    function handleCircles(pointer: [number, number]) {
        let targetX = pointer[0];

        linesRef.current.nodes().forEach((_lineNode: any, i: any) => {
            let intersection: interfaces.Coordinate | null = findYIntersectionPoint(_lineNode.__data__.code, targetX);
            if (!intersection) return;

            circlesRef.current.filter(function (_circle: any, index: number) {
                return i == index;
            })
                .attr("opacity", 1)
                .attr("cx", () => intersection?.x)
                .attr("cy", () => intersection?.y);
        });
    }

    function handleOverlays(pointer: [number, number]) {
        if (!overlaysRef.current) return;

        overlaysRef.current.filter(function (_overlay: any, index: number) {
            return true;
        }).attr("fill", "transparent")
            .filter((section: unknown) => {
                let s = section as interfaces.Section;
                return s.startXCoordinates <= pointer[0] && pointer[0] <= s.endXCoordinates;
            })
            .attr("fill", (section: unknown) => {
                let s = section as interfaces.Section;
                return s.color;
            });

    }

    function findYIntersectionPoint(lineCode: string, x: number) {
        x = xScale(x);
        const line = linesCacheRef.current.find(line => line.code === lineCode);

        if (!line) {
            return null;
        }

        line.coordinates.sort((a, b) => a.x - b.x);

        let closestPoint = line.coordinates[0];
        for (let i = 1; i < line.coordinates.length; i++) {
            if (line.coordinates[i].x > x) {
                break;
            }
            closestPoint = line.coordinates[i];
        }

        return closestPoint;
    }

    return (
        <div style={styles.svgContainer}>
            <svg ref={svgRef} style={styles.svgContentResponsive} />
        </div>
    );
};


// function findYIntersectionPoint(pathNode: any, x: number) {
//     let pathLength = pathNode.getTotalLength();
//     let precision = 1;

//     for (let i = 0; i <= pathLength; i += precision) {
//       let point = pathNode.getPointAtLength(i);

//       if (Math.abs(point.x - x) < precision) {
//         return point;
//       }
//     }
//     return null;
//   }

function findMaxX(data: any[]) {
    return Math.max(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.x)));
}
function findMinX(data: any[]) {
    return Math.min(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.x)));
}

function findMaxY(data: any[]) {
    return Math.max(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.y)));
}

function findMinY(data: any[]) {
    return Math.min(...wiggersGraphData.lines.flatMap(line => line.coordinates.map(point => point.y)));
}


export default WiggersDiagram;