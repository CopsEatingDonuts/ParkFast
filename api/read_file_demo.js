//demo code to read from car park availaility file

const fs = require('fs');

let rawdata = fs.readFileSync('ParkingLotAvailability.json');
console.log(typeof(rawdata));
carParkAvail = JSON.parse(JSON.parse(rawdata)).Result;
console.log(carParkAvail);
