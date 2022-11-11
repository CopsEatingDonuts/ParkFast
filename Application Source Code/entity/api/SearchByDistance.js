import fs from 'fs';
import svy21_to_wgs84 from './svy21_wgs84.js';

let uradata = fs.readFileSync('api\\ParkingLotAvailability.json');
var uraCarParkAvail = JSON.parse(JSON.parse(uradata)).Result;

let hdbdata = fs.readFileSync('Application Skeleton/entity/api/HDBParkingLotAvailability.json');
var hdbCarParkAvail = JSON.parse(hdbdata);

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
        try {
            (a.geometries[0]);
            (b.geometries[0]);
        }
        catch(err) {return 99999;}
        var a_coords = ((a.geometries[0].coordinates).split(',')).map(Number);
        a_coords = svy21_to_wgs84(a_coords);

        var b_coords = ((b.geometries[0].coordinates).split(',')).map(Number);
        b_coords = svy21_to_wgs84(b_coords);

        var a_distance = distance(a_coords.lat,destination_lat,a_coords.lon,destination_lon);
        var b_distance = distance(b_coords.lat,destination_lat,b_coords.lon,destination_lon);
        return a_distance - b_distance;
    }
}
function sortCarParkAvail(dataset, lat_coords, lon_coords) {
    dataset.sort(compareShortestPath(lat_coords, lon_coords));
    return dataset;
}

console.log(uraCarParkAvail);
sortCarParkAvail(uraCarParkAvail, 1.3138921701076636, 103.88178786007539);
console.log(uraCarParkAvail[0]);                       // closest carpark
console.log(uraCarParkAvail[1]);                       // 2nd closest carpark
console.log(uraCarParkAvail[2]);                       // 3rd closest carpark


sortCarParkAvail(hdbCarParkAvail, 1.3138921701076636, 103.88178786007539);
console.log(hdbCarParkAvail[0]);                       // closest carpark
console.log(hdbCarParkAvail[1]);                       // 2nd closest carpark
console.log(hdbCarParkAvail[2]);                       // 3rd closest carpark

/*
for (let i=0; i<carParkAvail.length; i++) {
    var try_coords = ((carParkAvail[i].geometries[0].coordinates).split(',')).map(Number);
    var y = svy21_to_wgs84(try_coords);
    console.log(distance(y.lat, 1.3138921701076636, y.lon, 103.88178786007539));
}
*/

export {sortCarParkAvail};