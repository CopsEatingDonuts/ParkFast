//import sortCarParkAvail from '../../api/SearchByDistance.js';
document.getElementById("result_location").innerHTML = sessionStorage.getItem("textvalue");
var parkingLot = sessionStorage.getItem("textvalue");
var near_place_lat = sessionStorage.getItem("near_place_lat");
var near_place_lng = sessionStorage.getItem("near_place_lng");
//sortCarParkAvail(near_place_lat, near_place_lng);
document.getElementById("parking_location_1").innerHTML = sessionStorage.getItem("near_place_lat"); //replace with 1st element of sorted carpark list
document.getElementById("parking_location_2").innerHTML = sessionStorage.getItem("near_place_lat"); //replace with 2nd element of sorted carpark list

function setColor(btn1, btn2) {
    var property1 = document.getElementById(btn1);
    var property2 = document.getElementById(btn2);
    property1.style.backgroundColor = "rgb(29, 155, 220)"
    property1.style.color = "white";
    property1.style.fontWeight = "bold";
    property1.style.opacity = 1
    property2.style.opacity = 0.4
    property2.style.backgroundColor = "white"
    property2.style.color = "black"
    property2.style.fontWeight = "normal"
}
    
function passParkingLot(){
    sessionStorage.setItem("carparkValue", parkingLot);
    return;
}