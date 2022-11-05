import sortCarParkAvail from '../../api/SearchByDistance.js';
document.getElementById("result_location").innerHTML = sessionStorage.getItem("textvalue");
var parkingLot = sessionStorage.getItem("textvalue");
var near_place_lat = sessionStorage.getItem("near_place_lat");
var near_place_lng = sessionStorage.getItem("near_place_lng");
sortCarParkAvail(near_place_lat, near_place_lng);
document.getElementById("parking_location_1").innerHTML = sessionStorage.getItem("near_place_lat"); //replace with 1st element of sorted carpark list
document.getElementById("parking_location_2").innerHTML = sessionStorage.getItem("near_place_lat"); //replace with 2nd element of sorted carpark list