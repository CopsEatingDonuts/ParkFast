document.getElementById("result_carpark").innerHTML = sessionStorage.getItem("carparkValue");
var carPark_location = sessionStorage.getItem("carparkValue");

var map;
function initMap() {
    var latlng = new google.maps.LatLng(1.3521, 103.8198);
    var mapOptions = {
      zoom: 10,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var marker = new google.maps.Marker({
    position: latlng,
    map,
    });
    
    
}


    