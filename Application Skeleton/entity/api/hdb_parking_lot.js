//will require xhr2 module, npm install xhr2
import XMLHttpRequest from "xhr2";
import {parse} from "csv-parse";
var url = "https://api.data.gov.sg/v1/transport/carpark-availability";
var xhr = new XMLHttpRequest();
var data = "";
var jsonData;
var temp;
var csv = [];

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
}};

function processArray() {
  jsonData = JSON.parse(JSON.parse(data));
  temp = jsonData.items[0].carpark_data;
  var length = temp.length;

  importCSV();
  setTimeout(function() {
    var csvLen = csv.length;
    for (var i=0; i<length; i++) {
      //console.log(temp[i].carpark_number);
      for (var j=0; j<csvLen; j++) {
        if (temp[i].carpark_number == csv[j][0]) {
          temp[i].Address = csv[j][1];
          temp[i].geometries =[];
          var tempX = csv[j][2];
          var tempY = csv[j][3];
          var tempdict = {};
          tempdict.coordinates = String(tempX) + "," + String(tempY);
          temp[i].geometries.push(tempdict);
          //console.log(temp[i].Address);
        }
      }
    }
  }, 500);
}

function importCSV() {
  fs.createReadStream("hdb-carpark-information.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    csv.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
  });
}

function insertAddress() {
  xhr.send();
  setTimeout(function() {processArray()}, 3000);
  setTimeout(function() {
    //write this string into a file
    fs.writeFile('HDBParkingLotAvailability.json', JSON.stringify(temp), (err) => {
       if (err) throw err;
       console.log('HDB Parking availability updated');
       });
  }, 6000);
}

insertAddress();
