import XMLHttpRequest from "xhr2";
var url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Season_Car_Park_Details";
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


      //retrieve response and convert into a JSON string
      data = JSON.stringify(xhr.responseText);

      //implement a check for the response, make sure it's valid
      const test = "Success";

      if (test.localeCompare(JSON.parse(JSON.parse(data)).Status) == 0) {
        console.log("testOK");
      }




      //write this string into a file
      fs.writeFile('ParkingRate.json', data, (err) => {
         if (err) throw err;
         console.log('Parking rate updated');
      });
   }};

//execute curl request
xhr.send();