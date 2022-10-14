var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

// code below only needs to be used once a day to generate token
// token value is stored in the variable 'new_token'
// new_token generated should be placed in the variable 'command'

/* var new_token = 'curl "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2"'
child = exec(new_token, function(error, stdout, stderr){

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
}); */

var command = 'curl "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2" -H "Token: pXjybfxqJ@bwnCbmtafm3227e9ae@juF2@fRqf0taVQb@N4eb2b-2T3bBc34K8efQv23642-9urvevr-6dkgjbbN9hD49-382dqn"'
child = exec(command, function(error, stdout, stderr){

    // stdout is the string of the carpark details(carparkNo, geometries, coordinates, lotsAvaiable)
    // cleaning stdout by removing front part of it
    dictionary = stdout.replace('{"Status":"Success","Message":"","Result":[{', "");
    dictionary = dictionary.replace('}]}','');

    // this prints out the original string before splitting it into the different carparks
    console.log(dictionary);

    // split the string into the carparks and prints it
    dictionary = dictionary.split('},{');
    console.log(dictionary);
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
});


  
var msg = 'Hello World';
console.log(msg);