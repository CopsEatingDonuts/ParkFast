import fs from 'fs';
import readline from 'readline';


var parkRate = JSON.parse(fs.readFileSync("URAParkingRate.json")).Result;
var parkLots = JSON.parse(fs.readFileSync("FinalDataSet.json"));
var hdbCentral = fs.readFileSync("HDBCentralCarparks.txt", "utf8").trim().split("\n");
var hdbRates = JSON.parse(fs.readFileSync("HDBRates.json"));

//console.log(hdbRates);

var n=0;
for (var i=0; i<parkLots.length; i++) {
  parkLots[i].parkingRate = [];
  for (var j=0; j<parkRate.length; j++) {
    if (parkLots[i].carpark_number == parkRate[j].ppCode) {
      parkLots[i].Address = parkRate[j].ppName;
      parkLots[i].parkingRate.push(parkRate[j]);
    }
  }

  if (hdbCentral.includes(parkLots[i].carpark_number)) {
    parkLots[i].parkingRate.push(hdbRates.car.hdbCentralRates);
    //console.log(parkLots[i]);
  }

  else if (parkLots[i].parkingRate.length == 0) {
    parkLots[i].parkingRate.push(hdbRates.car.hdbOutsideRates);
    parkLots[i].parkingRate.push(hdbRates.motorbike.hdbOutsideRates);
    n++;
  }

}

fs.writeFile('AvailabilityWithRates.json', JSON.stringify(parkLots), (err) => { //write to file
   if (err) throw err;
   console.log('Dataset compiled');
   })
