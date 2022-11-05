//import near_place from '../Screens\\SearchDestination\\SearchDestination.js';
import fs from 'fs';
import svy21_to_wgs84 from './svy21_wgs84.js';

let rawdata = fs.readFileSync('api\\ParkingLotAvailability.json');
//console.log(typeof(rawdata));
var carParkAvail = JSON.parse(JSON.parse(rawdata)).Result;
//console.log(typeof((carParkAvail[0].geometries[0].coordinates).split(',')));

function shortestPath(destination) {
    return function path(a, b) {
        //console.log(JSON.parse(a.geometries[0].coordinates));
        var a_coords = ((a.geometries[0].coordinates).split(',')).map(str => {
            return Number(str);
        });
        var a_shortest = (a_coords[0]-destination[0])**2 + (a_coords[1]-destination[1])**2;
    
        var b_coords = ((b.geometries[0].coordinates).split(',')).map(str => {
            return Number(str);
        });
        var b_shortest = (b_coords[0]-destination[0])**2 + (b_coords[1]-destination[1])**2;
        return a_shortest - b_shortest;
    }
}


carParkAvail.sort(shortestPath([33394,32909]));     //sort based on shortest distance from the svy21 coords 33394,32909
console.log(carParkAvail[0]);                       // closest carpark
console.log(carParkAvail[1]);                       // 2nd closest carpark
console.log(carParkAvail[2]);                       // 3rd closest carpark

export {shortestPath};