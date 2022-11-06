import fs from 'fs';

let rawdata = fs.readFileSync('Application Skeleton/entity/api/ParkingRate.json');
console.log(typeof(rawdata));
var carParkRate = JSON.parse(JSON.parse(rawdata)).Result;
for (let i=0;i<carParkRate.length;i++) {
    console.log(carParkRate[i].ppCode);
}