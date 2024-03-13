
import * as d3 from 'd3';
import { roundNumber } from './datahelper';


//iteratively search a path to get a point close to a desired x coordinate
export function findY(path, pathLength, x, width) {
    const accuracy = 1 //px
    const iterations = Math.ceil(Math.log10(accuracy / width) / Math.log10(0.5));  //for width (w), get the # iterations to get to the desired accuracy, generally 1px
    let i = 0;
    let nextLengthChange = pathLength / 2;
    let nextLength = pathLength / 2;
    let y = 0;
    for (i; i < iterations; i++) {
        let pos = path.getPointAtLength(nextLength)
        y = pos.y
        nextLength = x < pos.x ? nextLength - nextLengthChange : nextLength + nextLengthChange
        nextLengthChange = nextLengthChange / 2
    }
    return y
}


export function calculateAndAddYCoordinatesToArray(allCoordinates, path, width, lineId) {

    let pathNode = path.node()
    let pathNodeLength = pathNode.getTotalLength()
    let x = 0;

    // allCoordinates[lineId] = []

    // for (x; x < width; x++) {
    //     let obj = {}
    //     obj.y = findY(pathNode, pathNodeLength, x, width)
    //     allCoordinates[lineId].push(obj)
    // }
    // return allCoordinates;


    allCoordinates[lineId] = []

    for (x; x < width; x++) {
        let obj = {}
        obj.y = findY(pathNode, pathNodeLength, x, width)
        allCoordinates[lineId].push(obj)
    }

    return allCoordinates;
}