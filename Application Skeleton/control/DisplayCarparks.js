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

document.getElementById("result_location").innerHTML = sessionStorage.getItem("textvalue");
var parkingLot = sessionStorage.getItem("textvalue");

function passParkingLot(num){
    sessionStorage.setItem("carparkValue", parkingLot);
    var dataset = JSON.parse(sessionStorage.getItem("dataset"));
    coords = ((dataset[num].geometries[0].coordinates).split(',').map(Number));
    sessionStorage.setItem("near_place_lat", coords[0]);
    sessionStorage.setItem("near_place_lng", coords[1]);
    return;
}