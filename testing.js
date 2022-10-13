var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

var command = 'curl "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2" -H "Token: XRH7A54-+Juawg4dQ58bY5asyfmfe@4PeZdzdn4aF0td8U42fX9d22RacCawKtW4bddf3584a44hduN@abdbe43@AvNf5fyz@7FV"'
child = exec(command, function(error, stdout, stderr){

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
});


  
var msg = 'Hello World';
console.log(msg);