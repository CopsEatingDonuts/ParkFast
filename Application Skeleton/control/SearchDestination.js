document.getElementById("Hour").innerText = 0;
document.getElementById("Minute").innerText = 0;
function setHour(add) {
    console.log(add);
    var hourLabel = document.getElementById("Hour");
    var x = hourLabel.textContent;
        x = parseInt(x);
    if (add){
        hourLabel.innerHTML = x+1;
    }
    else{
        if(x == 0) return;
        hourLabel.innerHTML = x-1;
    }
    sessionStorage.setItem("Hour", parseInt(hourLabel.textContent));
}

function setMinute(add) {
    var minuteLabel = document.getElementById("Minute");
    var y = minuteLabel.textContent;
        y = parseInt(y);
    if (add){
        if(y == 30) return;
        minuteLabel.innerHTML = y+30;
    }
    else{
        if(y == 0) return;
        minuteLabel.innerHTML = y-30;
    }
    sessionStorage.setItem("Minute", parseInt(minuteLabel.textContent));
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

    var input = document.getElementById('destination_address');
    input.addEventListener("keydown", (event)=>{
        var key = event.key;
        if( key === "Backspace" || key === "Delete" ){
            destination = null;
        }
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
            if (sessionStorage.getItem("Hour")==null) sessionStorage.setItem("Hour", 0);
            if (sessionStorage.getItem("Minute")==null) sessionStorage.setItem("Minute", 0);
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