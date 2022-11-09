function passDestination(){
    var destination_address = document.getElementById("destination_address").value;
    sessionStorage.setItem("destination_address", destination_address);
    if (sessionStorage.getItem("Hour")==null) sessionStorage.setItem("Hour", 0);
    if (sessionStorage.getItem("Minute")==null) sessionStorage.setItem("Minute", 0);
    return;
}

function setHour() {
    var x = document.getElementById("Hour");
    sessionStorage.setItem("Hour", x.value);
    return;
}

function setMinute() {
    var x = document.getElementById("Minute");
    sessionStorage.setItem("Minute", x.value);
    return;
}

$(document).ready(function () {
    var destination;
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById("destination_address")), {
        componentRestrictions: {'country': ['SG']},
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        destination = autocomplete.getPlace();
        sessionStorage.setItem("destination_lat", destination.geometry.location.lat());
        sessionStorage.setItem("destination_lng", destination.geometry.location.lng());
    });

    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function(event){
        if(destination == null){
            alert("please choose a valid input");
        }
        else{
            var destination_address = document.getElementById("destination_address").value;
            console.log(destination_address);
            sessionStorage.setItem("destination_address", destination_address);
            window.location.href = "DisplayCarparks.html";
        }
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