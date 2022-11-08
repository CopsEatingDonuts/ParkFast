function passDestination(){
    var destination_address = document.getElementById("destination_address").value;
    sessionStorage.setItem("destination_address", destination_address);
    return;
}

$(document).ready(function () {
 var autocomplete;
 autocomplete = new google.maps.places.Autocomplete((document.getElementById("destination_address")), {
  componentRestrictions: {'country': ['SG']},
 });
  
 google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var destination = autocomplete.getPlace();
  //alert(destination.geometry.location.lat());
  sessionStorage.setItem("destination_lat", destination.geometry.location.lat());
  sessionStorage.setItem("destination_lng", destination.geometry.location.lng());
 });
});

document.getElementById("openButton").addEventListener("click", popUp);
function popUp(){
    document.body.classList.add("active-popup");
}

document.getElementById("closeButton").addEventListener("click", closePopUp);
function closePopUp(){
    document.body.classList.remove("active-popup");
}