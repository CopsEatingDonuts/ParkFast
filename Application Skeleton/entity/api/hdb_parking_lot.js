//will require xhr2 module, npm install xhr2
import XMLHttpRequest from "xhr2";
var url = "https://api.data.gov.sg/v1/transport/carpark-availability";
var xhr = new XMLHttpRequest();
var data = "";

import fs from 'fs';
import readline from 'readline';

//prepare curl request
xhr.open("GET", url);

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
      fs.writeFile('HDBParkingLotAvailability.json', data, (err) => {
         if (err) throw err;
         console.log('HDB Parking availability updated');
      });
   }};

//execute curl request
xhr.send();
