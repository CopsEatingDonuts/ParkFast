import XMLHttpRequest from "xhr2";
var url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
var xhr = new XMLHttpRequest();
var data = "";

import fs from 'fs';
import readline from 'readline';

//read token & access key from stored files
const new_token = fs.readFileSync('new_token.txt', 'utf8').trim();
console.log("Token used : "+new_token);
const accessKey = fs.readFileSync('access_key.txt', 'utf8').trim();
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


      //retrieve response and convert into a JSON object
      data = JSON.parse(xhr.responseText);

      console.log(data.Result);

      for (var i=0; i<data.Result.length; i++) {
        data.Result[i].Address = "URA Car Park";
      }


      //implement a check for the response, make sure it's valid
      const test = "Success";

      if (test.localeCompare(data.Status) == 0) {
        console.log("testOK");
        fs.writeFile('ParkingLotAvailability.json', JSON.stringify(data), (err) => {
           if (err) throw err;
           console.log('Parking availability updated');
        });
      }
   }};

//execute curl request
xhr.send();
