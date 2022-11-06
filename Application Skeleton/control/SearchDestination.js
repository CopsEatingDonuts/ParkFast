function passDestination(){
    var dest = document.getElementById("dest").value;
    sessionStorage.setItem("textvalue", dest);
    return;
}

$(document).ready(function () {
 var autocomplete;
 autocomplete = new google.maps.places.Autocomplete((document.getElementById("dest")), {
  componentRestrictions: {'country': ['SG']},
 });
  
 google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var near_place = autocomplete.getPlace();
  //alert(near_place.geometry.location.lat());
  sessionStorage.setItem("near_place_lat", near_place.geometry.location.lat());
  sessionStorage.setItem("near_place_lng", near_place.geometry.location.lng());
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