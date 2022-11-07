import fs from 'fs';
import readline from 'readline';

var hdb = fs.readFileSync("HDBParkingLotAvailability.json");
var ura = fs.readFileSync("ParkingLotAvailability.json");

var hdbObj = JSON.parse(hdb);
var uraObj = JSON.parse(ura).Result;

var finalObj = [];
//console.log(hdbObj.length);
//console.log(uraObj.length);

function renameKey ( obj, oldKey, newKey ) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

for (var i=0; i<hdbObj.length; i++) {
  if ((hdbObj[i].hasOwnProperty("Address"))) finalObj.push(hdbObj[i]);
}

for (var j=0; j<uraObj.length; j++) {
  //finalObj.push(uraObj[j]);
  uraObj[j].carpark_info = [];

  for (var k=0; k<uraObj.length; k++) {
    if (uraObj[k].carparkNo == uraObj[j].carparkNo) {
      var temp = {};
      temp.lots_available = uraObj[k].lotsAvailable;
      temp.lot_type = uraObj[k].lotType;
      uraObj[j].carpark_info.push(temp);
    }
  }
}

for (var i=0; i<uraObj.length; i++) {
  for (var j=i+1; j<uraObj.length; j++) {
    if (uraObj[i] && uraObj[j] && uraObj[i].carparkNo == uraObj[j].carparkNo) delete uraObj[j];
  }
}

var testObj = Array.from(new Set(uraObj)).filter(item => item !== undefined);
//console.log(testObj);
for (var i=0; i<testObj.length; i++) finalObj.push(testObj[i]);

finalObj.forEach( obj => renameKey( obj, 'carparkNo', 'carpark_number' ) ); //renaming keys to standardise

fs.writeFile('FinalDataSet.json', JSON.stringify(finalObj), (err) => {
   if (err) throw err;
   console.log('Final dataset compiled');
   })
//console.log(finalObj);
