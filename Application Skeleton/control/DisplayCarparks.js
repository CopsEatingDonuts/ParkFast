function setColor(btn1, btn2, btn3) {
    var property1 = document.getElementById(btn1);
    var property2 = document.getElementById(btn2);
    var property3 = document.getElementById(btn3);
    property1.style.backgroundColor = "rgb(29, 155, 220)"
    property1.style.color = "white";
    property1.style.fontWeight = "bold";
    property1.style.opacity = 1
    property2.style.opacity = 0.4
    property2.style.backgroundColor = "white"
    property2.style.color = "black"
    property2.style.fontWeight = "normal"
    property3.style.opacity = 0.4
    property3.style.backgroundColor = "white"
    property3.style.color = "black"
    property3.style.fontWeight = "normal"
}

var destination_address = sessionStorage.getItem("destination_address");
document.getElementById("result_location").innerHTML = destination_address;

function passParkingLot(num){
    sessionStorage.setItem("carpark_address", destination_address);
    var dataset = JSON.parse(sessionStorage.getItem("dataset"));
    coords = ((dataset[num].geometries[0].coordinates).split(',').map(Number));
    sessionStorage.setItem("selected_lat", coords[0]);
    sessionStorage.setItem("selected_lng", coords[1]);
    sessionStorage.setItem("selected_carpark", JSON.stringify(dataset[num]));
    sessionStorage.setItem("selected_carpark_address", dataset[num].Address);
    sessionStorage.setItem("selected_carpark_lots", dataset[num].carpark_info);
    return;
}