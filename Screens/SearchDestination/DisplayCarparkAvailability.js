document.getElementById("result_carpark").innerHTML = sessionStorage.getItem("carparkValue");
var carPark_location = sessionStorage.getItem("carparkValue");

const openModal = document.querySelector('.upload-image');
const closeModal = document.querySelector('.close');
const closeModal1 = document.querySelector('.submit');
const modal = document.querySelector('#modal');

openModal.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})

closeModal1.addEventListener('click', () => {
  modal.close();
})
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

var imgBox1 = document.getElementById("imgbox1");
var upload1 = document.getElementById("upload1");
var loadFile = function(event){
  imgBox1.style.backgroundImage = "url(" +URL.createObjectURL(event.target.files[0])+ ")";
  upload1.style.maxWidth = auto;
}

    