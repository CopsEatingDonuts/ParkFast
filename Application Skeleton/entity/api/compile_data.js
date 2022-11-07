import fs from 'fs';
import readline from 'readline';

var hdb = fs.readFileSync("HDBParkingLotAvailability.json");
var ura = fs.readFileSync("ParkingLotAvailability.json");

var hdbObj = JSON.parse(hdb);
var uraObj = JSON.parse(ura).Result;

var finalObj = [];
//console.log(hdbObj.length);
//console.log(uraObj.length);

for (var i=0; i<hdbObj.length; i++) {
  if ((hdbObj[i].hasOwnProperty("Address"))) finalObj.push(hdbObj[i]);
}

for (var j=0; j<uraObj.length; j++) {
  finalObj.push(uraObj[j]);
}

fs.writeFile('FinalDataSet.json', JSON.stringify(finalObj), (err) => {
   if (err) throw err;
   console.log('Final dataset compiled');
   })
//console.log(finalObj);
