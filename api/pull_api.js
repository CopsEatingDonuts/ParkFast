//will require xhr2 module, npm install xhr2
import XMLHttpRequest from "xhr2";
var url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
var xhr = new XMLHttpRequest();
var data = "";

import fs from 'fs';
import readline from 'readline';

//read token & access key from stored files
const new_token = fs.readFileSync('./api\\new_token.txt', 'utf8').trim();
console.log("Token used : "+new_token);
const accessKey = fs.readFileSync('./api\\access_key.txt', 'utf8').trim();
console.log("AccessKey used : "+accessKey);
//const {new_token} = require('./generate_token.js');


//prepare curl request
xhr.open("GET", url);
xhr.setRequestHeader("AccessKey", accessKey);
xhr.setRequestHeader("Token", new_token);

//prepare what to do after response is received
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);


      //retrieve response and convert into a JSON string
      data = JSON.stringify(xhr.responseText);

      //implement a check for the response, make sure it's valid
      const test = "Success";

      if (test.localeCompare(JSON.parse(JSON.parse(data)).Status) == 0) {
        console.log("testOK");
      }




      //write this string into a file
      fs.writeFile('api\\ParkingLotAvailability.json', data, (err) => {
         if (err) throw err;
         console.log('Parking availability updated');
      });
   }};

//execute curl request
xhr.send();

/* javascript runs asynchrously. I'm setting a timeout of 1second to give time for the exec code above to run and update
the variable 'dicionary' before printing out dictionary

next time probably wont use this setTimeout if we are splitting the files anyway
*/


//setTimeout(function() {console.log(results[0].geometries)}, 2000);

import svy21_to_wgs84 from './svy21_wgs84.js';

var wgs84_new_coords = svy21_to_wgs84(33394.2043, 32909.1642);
console.log(wgs84_new_coords);
