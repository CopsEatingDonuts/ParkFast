import sortCarParkAvail from '../../Application Skeleton/entity/api/SearchByDistance.js';

document.getElementById("result_location").innerHTML = sessionStorage.getItem("textvalue");
var parkingLot = sessionStorage.getItem("textvalue");
var near_place_lat = sessionStorage.getItem("near_place_lat");
var near_place_lng = sessionStorage.getItem("near_place_lng");
var carParkAvail = sortCarParkAvail(near_place_lat, near_place_lng);
console.log(carParkAvail[0]);

document.getElementById("parking_location_1").innerHTML = carParkAvail[0];
document.getElementById("parking_location_2").innerHTML = carParkAvail[1];