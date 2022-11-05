//import near_place from '../Screens\\SearchDestination\\SearchDestination.js';
import fs from 'fs';
import svy21_to_wgs84 from './svy21_wgs84.js';

let rawdata = fs.readFileSync('api\\ParkingLotAvailability.json');
//console.log(typeof(rawdata));
var carParkAvail = JSON.parse(JSON.parse(rawdata)).Result;
//console.log(typeof((carParkAvail[0].geometries[0].coordinates).split(',')));

function distance(lat1, lat2, lon1, lon2)
{
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
}

function compareShortestPath(destination_lat, destination_lon) {
    return function path(a, b) {
        var a_coords = ((a.geometries[0].coordinates).split(',')).map(Number);
        a_coords = svy21_to_wgs84(a_coords);

        var b_coords = ((b.geometries[0].coordinates).split(',')).map(Number);
        b_coords = svy21_to_wgs84(b_coords);

        var a_distance = distance(a_coords.lat,destination_lat,a_coords.lon,destination_lon);
        var b_distance = distance(b_coords.lat,destination_lat,b_coords.lon,destination_lon);
        return a_distance - b_distance;
    }
}
function sortCarParkAvail(lat_coords, lon_coords) {
    carParkAvail.sort(compareShortestPath(lat_coords, lon_coords));
}

carParkAvail.sort(compareShortestPath(1.3138921701076636, 103.88178786007539));     //sort based on shortest distance from the wgs84 coords 1.3138921701076636, 103.88178786007539
console.log(carParkAvail[0]);                       // closest carpark
console.log(carParkAvail[1]);                       // 2nd closest carpark
console.log(carParkAvail[2]);                       // 3rd closest carpark

for (let i=0; i<carParkAvail.length; i++) {
    var try_coords = ((carParkAvail[i].geometries[0].coordinates).split(',')).map(Number);
    var y = svy21_to_wgs84(try_coords);
    console.log(distance(y.lat, 1.3138921701076636, y.lon, 103.88178786007539));
}

export default sortCarParkAvail;