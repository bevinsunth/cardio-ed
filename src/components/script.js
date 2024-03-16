document.addEventListener("DOMContentLoaded", function () {
    var graphColors = ["#f15b40", "#fdb933", "#f9ed32", "#8dc63f", "#45a2bc", "#2a5caa", "#8f53a1", "#d83d96"];
    var graphData = [
        {
            name: "LAHF",
            no:[300,300,150,250,320,250,200]
        },
        {
            name: "Vitaly",
            no:[600,350,500,200,750,350,550]
        }
//                    ,
//                    {
//                        name: "PewD",
//                        no:[450,650,550,400,350,600,800]
//                    },
//                    {
//                        name: "Hood",
//                        no:[50,100,150,100,80,150,300]
//                    },
//                    {
//                        name: "Fred",
//                        no:[250,250,350,450,400,350,400]
//                    }
    ];

    graphData.forEach(function (el) {
        el.maxY = d3.max(el.no, function (d) {
            return d;
        });
    });

    var margin = {
            top: 20,
            right: 30,
            bottom: 20,
            left: 40
        },
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
        .domain([0, d3.max(graphData, function (d) {
            return d.no.length;
        }) - 1])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(graphData, function (d) {
            return d.maxY;
        })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(-height, 0)
        .tickFormat(d3.format("d"))
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(width)
        .ticks(5)
        .orient("right");

    var yAxis2 = d3.svg.axis()
        .scale(yScale)
        .ticks(5)
        .orient("left");

    var svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var mouseUnderlay = svg.append("rect").attr({
        x: margin.left,
        y: margin.top,
        width: width,
        height: height,
        fill: "#fff"
        //transform: "translate(" + margin.left+ "," + margin.top + ")"
    });

    var line = d3.svg.line()
        .x(function (d, i) {
            //return margin.left + xScale(i);
            return xScale(i);
        })
        .y(function (d) {
            return margin.top + yScale(d);
//                         return yScale(d);
        })
        .interpolate("cardinal");

    //X AXIS
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left+ "," + (height + margin.top) + ")")
        .style("font-size", "12px")
        .call(xAxis);

    //Y AXIS
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left  + "," + margin.top + ")")
        .call(yAxis);

    //Y 2nd Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis2);

    var lineGroup = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", 0)");

    var lines = lineGroup.selectAll(".gLine")
        .data(graphData)
        .enter()
        .append("path")
        .attr("class","gLine")
        .attr("d", function (d) {
            return line(d.no);
        })
        .attr("stroke", function (d,i) {
            return graphColors[i];
        })
        .attr("fill", "transparent")
        .attr("stroke-width", "2px");

    var circles = lineGroup.selectAll("circle")
        .data(graphData)
        .enter()
        .append("circle")
        //.attr("opacity", 0)
        .attr("r", 6)
        .attr("fill", function (d, i) {
            return graphColors[i];
        });

    mouseUnderlay.on("mousemove", function () {
        var x = d3.mouse(this)[0] - margin.left;

        lines.each(function (d, i) {
            var pathEl = this;
            var pathLength = pathEl.getTotalLength();
            var beginning = x, end = pathLength, target, pos;

            while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = pathEl.getPointAtLength(target);
                if ((target === end || target === beginning) && pos.x !== x) {
                    break;
                }
                if (pos.x > x) {
                    end = target;
                } else if (pos.x < x) {
                    beginning = target;
                } else {
                    break; //position found
                }
            }

            circles.filter(function (d, index) {
                return i == index;
            })
                .attr("opacity", 1)
                .attr("cx", x)
                .attr("cy", pos.y);
        });
    });
});