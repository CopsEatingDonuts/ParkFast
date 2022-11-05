function passDestination(){
    var dest = document.getElementById("dest").value;
    sessionStorage.setItem("textvalue", dest);
    return;
}

var searchInput = "dest";
$(document).ready(function () {
 var autocomplete;
 autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
  componentRestrictions: {'country': ['SG']},
 });
  
 google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var near_place = autocomplete.getPlace();
  sessionStorage.setItem("near_place_lat", near_place.geometry.location.lat());
  sessionStorage.setItem("near_place_lng", near_place.geometry.location.lng());
 });
});

/*let autocomplete;
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('dest'),{
        types: ['geocode'],
        componentRestrictions: {'country': ['SG']},
        fields: ['place_id', 'geometry', 'name']     
    });
}*/