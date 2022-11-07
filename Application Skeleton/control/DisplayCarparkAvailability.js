document.getElementById("result_carpark").innerHTML = sessionStorage.getItem("carparkValue");
var carPark_location = sessionStorage.getItem("carparkValue");
var near_place_lat = sessionStorage.getItem("near_place_lat");
var near_place_lng = sessionStorage.getItem("near_place_lng");

var map;
function initMap() {
    var latlng = new google.maps.LatLng(near_place_lat, near_place_lng);
    var mapOptions = {
      zoom: 15,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var marker = new google.maps.Marker({
    position: latlng,
    map,
    });
    
    
}


    