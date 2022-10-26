var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

const fs = require('fs');
const readline = require('readline');
const new_token = fs.readFileSync('./new_token.txt', 'utf8');

//const {new_token} = require('./generate_token.js');

var command = 'curl "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2" -H "Token: '+new_token+'"';
exec(command, function(error, stdout, stderr){

    results = JSON.parse(stdout).Result;

    /*
    // stdout is the string of the carpark details(carparkNo, geometries, coordinates, lotsAvaiable)
    // cleaning stdout by removing front part of it
    dictionary = stdout.replace('{"Status":"Success","Message":"","Result":[{', "");
    dictionary = dictionary.replace('}]}','');

    // this prints out the original string before splitting it into the different carparks
    console.log(dictionary);

    // split the string into the carparks and prints it
    dictionary = dictionary.split('},{');

    */
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
});

/* javascript runs asynchrously. I'm setting a timeout of 1second to give time for the exec code above to run and update
the variable 'dicionary' before printing out dictionary

next time probably wont use this setTimeout if we are splitting the files anyway
*/

setTimeout(function() {console.log(results[0].geometries)}, 2000);

var svy21_to_wgs84 =  require('./svy21_wgs84.js');

var wgs84_new_coords = svy21_to_wgs84(33394.2043, 32909.1642);
console.log(wgs84_new_coords);