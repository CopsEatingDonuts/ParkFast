var SVY21 = (function(){
  // Ref: http://www.linz.govt.nz/geodetic/conversion-coordinates/projection-conversions/transverse-mercator-preliminary-computations/index.aspx
  
  // WGS84 Datum
  this.a = 6378137;
  this.f = 1 / 298.257223563;

  // SVY21 Projection
  // Fundamental point: Base 7 at Pierce Resevoir.
  // Latitude: 1 22 02.9154 N, longitude: 103 49 31.9752 E (of Greenwich).

  // Known Issue: Setting (oLat, oLon) to the exact coordinates specified above
// results in computation being slightly off. The values below give the most
  // accurate represenation of test data.
  this.oLat = 1.366666; // origin's lat in degrees
  this.oLon = 103.833333; // origin's lon in degrees
  this.oN = 38744.572; // false Northing
  this.oE = 28001.642; // false Easting
  this.k = 1; // scale factor

  this.init = function(){

      this.b = this.a * (1 - this.f);
      this.e2 = (2 * this.f) - (this.f * this.f);
      this.e4 = this.e2 * this.e2;
      this.e6 = this.e4 * this.e2;
      this.A0 = 1 - (this.e2 / 4) - (3 * this.e4 / 64) - (5 * this.e6 / 256);
      this.A2 = (3. / 8.) * (this.e2 + (this.e4 / 4) + (15 * this.e6 / 128));
      this.A4 = (15. / 256.) * (this.e4 + (3 * this.e6 / 4));
      this.A6 = 35 * this.e6 / 3072;
};
this.init();

  this.computeSVY21 = function(lat, lon){
      //Returns a pair (N, E) representing Northings and Eastings in SVY21.

      var latR = lat * Math.PI / 180;
      var sinLat = Math.sin(latR);
      var sin2Lat = sinLat * sinLat;
      var cosLat = Math.cos(latR);
      var cos2Lat = cosLat * cosLat;
      var cos3Lat = cos2Lat * cosLat;
      var cos4Lat = cos3Lat * cosLat;
      var cos5Lat = cos4Lat * cosLat;
      var cos6Lat = cos5Lat * cosLat;
      var cos7Lat = cos6Lat * cosLat;

      var rho = this.calcRho(sin2Lat);
      var v = this.calcV(sin2Lat);
      var psi = v / rho;
      var t = Math.tan(latR);
      var w = (lon - this.oLon) * Math.PI / 180;

      var M = this.calcM(lat);
      var Mo = this.calcM(this.oLat);

      var w2 = w * w;
      var w4 = w2 * w2;
      var w6 = w4 * w2;
      var w8 = w6 * w2;

      var psi2 = psi * psi;
      var psi3 = psi2 * psi;
      var psi4 = psi3 * psi;

      var t2 = t * t;
      var t4 = t2 * t2;
      var t6 = t4 * t2;

      // Compute Northing
      var nTerm1 = w2 / 2 * v * sinLat * cosLat;
      var nTerm2 = w4 / 24 * v * sinLat * cos3Lat * (4 * psi2 + psi - t2);
      var nTerm3 = w6 / 720 * v * sinLat * cos5Lat * ((8 * psi4) * (11 - 24 * t2) - (28 * psi3) * (1 - 6 * t2) + psi2 * (1 - 32 * t2) - psi * 2 * t2 + t4);
      var nTerm4 = w8 / 40320 * v * sinLat * cos7Lat * (1385 - 3111 * t2 + 543 * t4 - t6);
      var N = this.oN + this.k * (M - Mo + nTerm1 + nTerm2 + nTerm3 + nTerm4);

      // Compute Easting
      var eTerm1 = w2 / 6 * cos2Lat * (psi - t2);
      var eTerm2 = w4 / 120 * cos4Lat * ((4 * psi3) * (1 - 6 * t2) + psi2 * (1 + 8 * t2) - psi * 2 * t2 + t4);
      var eTerm3 = w6 / 5040 * cos6Lat * (61 - 479 * t2 + 179 * t4 - t6);
      var E = this.oE + this.k * v * w * cosLat * (1 + eTerm1 + eTerm2 + eTerm3);

      return {N:N, E:E};
};



this.calcM = function(lat, lon){
      var latR = lat * Math.PI / 180;
      return this.a * ((this.A0 * latR) - (this.A2 * Math.sin(2 * latR)) + (this.A4 * Math.sin(4 * latR)) - (this.A6 * Math.sin(6 * latR)));
};

  this.calcRho = function(sin2Lat){
      var num = this.a * (1 - this.e2);
      var denom = Math.pow(1 - this.e2 * sin2Lat, 3. / 2.);
      return num / denom;
};

  this.calcV = function(sin2Lat){
      var poly = 1 - this.e2 * sin2Lat;
      return this.a / Math.sqrt(poly);
};



  this.computeLatLon = function(N, E){
      // Returns a pair (lat, lon) representing Latitude and Longitude.
      

      var Nprime = N - this.oN;
      var Mo = this.calcM(this.oLat);
      var Mprime = Mo + (Nprime / this.k);
      var n = (this.a - this.b) / (this.a + this.b);
      var n2 = n * n;
      var n3 = n2 * n;
      var n4 = n2 * n2;
      var G = this.a * (1 - n) * (1 - n2) * (1 + (9 * n2 / 4) + (225 * n4 / 64)) * (Math.PI / 180);
      var sigma = (Mprime * Math.PI) / (180. * G);
      
      var latPrimeT1 = ((3 * n / 2) - (27 * n3 / 32)) * Math.sin(2 * sigma);
      var latPrimeT2 = ((21 * n2 / 16) - (55 * n4 / 32)) * Math.sin(4 * sigma);
      var latPrimeT3 = (151 * n3 / 96) * Math.sin(6 * sigma);
      var latPrimeT4 = (1097 * n4 / 512) * Math.sin(8 * sigma);
      var latPrime = sigma + latPrimeT1 + latPrimeT2 + latPrimeT3 + latPrimeT4;

      var sinLatPrime = Math.sin(latPrime);
      var sin2LatPrime = sinLatPrime * sinLatPrime;

      var rhoPrime = this.calcRho(sin2LatPrime);
      var vPrime = this.calcV(sin2LatPrime);
      var psiPrime = vPrime / rhoPrime;
      var psiPrime2 = psiPrime * psiPrime;
      var psiPrime3 = psiPrime2 * psiPrime;
      var psiPrime4 = psiPrime3 * psiPrime;
      var tPrime = Math.tan(latPrime);
      var tPrime2 = tPrime * tPrime;
      var tPrime4 = tPrime2 * tPrime2;
      var tPrime6 = tPrime4 * tPrime2;
      var Eprime = E - this.oE;
      var x = Eprime / (this.k * vPrime);
      var x2 = x * x;
      var x3 = x2 * x;
      var x5 = x3 * x2;
      var x7 = x5 * x2;

      // Compute Latitude
      var latFactor = tPrime / (this.k * rhoPrime);
      var latTerm1 = latFactor * ((Eprime * x) / 2);
      var latTerm2 = latFactor * ((Eprime * x3) / 24) * ((-4 * psiPrime2) + (9 * psiPrime) * (1 - tPrime2) + (12 * tPrime2));
      var latTerm3 = latFactor * ((Eprime * x5) / 720) * ((8 * psiPrime4) * (11 - 24 * tPrime2) - (12 * psiPrime3) * (21 - 71 * tPrime2) + (15 * psiPrime2) * (15 - 98 * tPrime2 + 15 * tPrime4) + (180 * psiPrime) * (5 * tPrime2 - 3 * tPrime4) + 360 * tPrime4);
      var latTerm4 = latFactor * ((Eprime * x7) / 40320) * (1385 - 3633 * tPrime2 + 4095 * tPrime4 + 1575 * tPrime6);
      var lat = latPrime - latTerm1 + latTerm2 - latTerm3 + latTerm4;

      // Compute Longitude
      var secLatPrime = 1. / Math.cos(lat);
      var lonTerm1 = x * secLatPrime;
      var lonTerm2 = ((x3 * secLatPrime) / 6) * (psiPrime + 2 * tPrime2);
      var lonTerm3 = ((x5 * secLatPrime) / 120) * ((-4 * psiPrime3) * (1 - 6 * tPrime2) + psiPrime2 * (9 - 68 * tPrime2) + 72 * psiPrime * tPrime2 + 24 * tPrime4);
      var lonTerm4 = ((x7 * secLatPrime) / 5040) * (61 + 662 * tPrime2 + 1320 * tPrime4 + 720 * tPrime6);
      var lon = (this.oLon * Math.PI / 180) + lonTerm1 - lonTerm2 + lonTerm3 - lonTerm4;

      return {"lat": lat / (Math.PI / 180), "lon": lon / (Math.PI / 180)};
};

});

// the function below, computeLatLon uses N,E. coords from ura api is in E,N. Therefore the function takes in y,x and uses them as x,y
var trying = new SVY21();
function svy21_to_wgs84(coords) {
  var wgs84_coords = trying.computeLatLon(coords[1],coords[0]);
  return wgs84_coords;
}

var selected_carpark_address = sessionStorage.getItem("selected_carpark_address");
document.getElementById("result_carpark").innerHTML = selected_carpark_address;

var formattedAddress = encodeURIComponent(selected_carpark_address);

var wgs84_coords = svy21_to_wgs84([Number(sessionStorage.getItem("selected_lat")), Number(sessionStorage.getItem("selected_lng"))]);
if (Number(sessionStorage.getItem("selected_lat"))<2) {
    wgs84_coords = {
      lat: Number(sessionStorage.getItem("selected_lat")),
      lon: Number(sessionStorage.getItem("selected_lng"))
  }
}
var selected_carpark_lat = Number(sessionStorage.getItem("selected_lat"));
var selected_carpark_lng = Number(sessionStorage.getItem("selected_lng"));
var selected_carpark_lat_wgs84 = wgs84_coords.lat;
var selected_carpark_lng_wgs84 = wgs84_coords.lon;

var selected_carpark = JSON.parse(sessionStorage.getItem("selected_carpark"));
var selected_carpark_info = selected_carpark.carpark_info;
try {
  for (let i=0;i<selected_carpark_info.length;i++) {
    if ((selected_carpark_info[i].lot_type) == "C")  document.getElementById("num1").innerHTML = selected_carpark_info[i].lots_available;
    else if ((selected_carpark_info[i].lot_type) == "M")  document.getElementById("num2").innerHTML = selected_carpark_info[i].lots_available;
    else if ((selected_carpark_info[i].lot_type) == "H")  document.getElementById("num3").innerHTML = selected_carpark_info[i].lots_available;
  }
}
catch (err) {}

var map;
function initMap() {
    var latlng = new google.maps.LatLng(selected_carpark_lat_wgs84, selected_carpark_lng_wgs84);
    var mapOptions = {
      zoom: 15,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
}

var imgBox1 = document.getElementById("imgbox1");
var upload1 = document.getElementById("upload1");
var loadFile = function(event){
  imgBox1.style.backgroundImage = "url(" +URL.createObjectURL(event.target.files[0])+ ")";
  upload1.style.maxWidth = auto;
}

const openModal = document.querySelector('.upload-image');
const closeModal = document.querySelector('.close');
const modal = document.querySelector('#modal');

openModal.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})


document.getElementById("proceedButton").addEventListener("click", navigate);
function navigate(){
  window.location.href = "https://www.google.com/maps/search/?api=1&query="+formattedAddress;
}

var carparkRate = document.getElementById("carParkRate");
var carparkRate2 = document.getElementById("carParkRate2");
var carparkRate1 = document.getElementById("carParkRate1");

var parkingRates = selected_carpark.parkingRate[0];
var weekdayMin = parkingRates.weekdayMin;
var weekdayRate = "Weekday Rate : " + parkingRates.weekdayRate + "/" + weekdayMin;
var satdayMin = parkingRates.satdayMin;
var satdayRate = "Saturday Rate : " + parkingRates.satdayRate + "/" + satdayMin;
var sunPHMin = parkingRates.sunPHMin;
var sunPHRate = "Sunday & PH Rate : " + parkingRates.sunPHRate + "/" + sunPHMin;
carparkRate.innerHTML = weekdayRate;
carparkRate1.innerHTML = satdayRate;
carparkRate2.innerHTML = sunPHRate;

var EstimatedRate = document.getElementById("EstimatedRate");
var cost = (Number(sessionStorage.getItem("Hour"))*2 + Math.ceil(Number(sessionStorage.getItem("Minute"))/30)) * Number((parkingRates.weekdayRate).slice(1,));
EstimatedRate.innerHTML = "Estimated cost of parking: $"+cost.toFixed(2);


function validateForm2() {
  //check empty first name field 
  var remark = document.getElementById("remarks").value; 
  if(remark == "") {  
    document.getElementById("message").innerHTML = "*Enter remarks";  
    return false;  
  }
  alert("Image has been uploaded successfully!")
  modal.close();
  return true;
}