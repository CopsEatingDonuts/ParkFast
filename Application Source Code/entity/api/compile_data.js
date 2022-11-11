import fs from 'fs';
import readline from 'readline';

var hdb = fs.readFileSync("HDBParkingLotAvailability.json");
var ura = fs.readFileSync("ParkingLotAvailability.json");

var hdbObj = JSON.parse(hdb);
var uraObj = JSON.parse(ura).Result;

var finalObj = [];
//console.log(hdbObj.length);
//console.log(uraObj.length);

function renameKey ( obj, oldKey, newKey ) { //small helper function to change key names
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

for (var i=0; i<hdbObj.length; i++) {
  if ((hdbObj[i].hasOwnProperty("Address"))) finalObj.push(hdbObj[i]); //only push those from the LUT
}

for (var j=0; j<uraObj.length; j++) { //loop to merge duplicate car park lots in ura set; does not remove
  //finalObj.push(uraObj[j]);
  uraObj[j].carpark_info = [];

  for (var k=0; k<uraObj.length; k++) {
    if (uraObj[k].carparkNo == uraObj[j].carparkNo) {
      var temp = {};
      temp.lots_available = uraObj[k].lotsAvailable;
      temp.lot_type = uraObj[k].lotType;
      uraObj[j].carpark_info.push(temp); //add into the set
    }
  }
}

for (var i=0; i<uraObj.length; i++) { //remove duplicates from ura set
  for (var j=i+1; j<uraObj.length; j++) {
    if (uraObj[i] && uraObj[j] && uraObj[i].carparkNo == uraObj[j].carparkNo) delete uraObj[j];
  }
}

var testObj = Array.from(new Set(uraObj)).filter(item => item !== undefined); //remove undefined entries
//console.log(testObj);
for (var i=0; i<testObj.length; i++) finalObj.push(testObj[i]); //push ura set into final object to be written

finalObj.forEach( obj => renameKey( obj, 'carparkNo', 'carpark_number' ) ); //renaming keys to standardise

fs.writeFile('FinalDataSet.json', JSON.stringify(finalObj), (err) => { //write to file
   if (err) throw err;
   console.log('Final dataset compiled');
   })
//console.log(finalObj);
