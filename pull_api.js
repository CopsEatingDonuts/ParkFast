var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

var x = "data-123-abc-def";
console.log(x.split('-'));

var command = 'curl "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2" -H "Token: pXjybfxqJ@bwnCbmtafm3227e9ae@juF2@fRqf0taVQb@N4eb2b-2T3bBc34K8efQv23642-9urvevr-6dkgjbbN9hD49-382dqn"'
child = exec(command, function(error, stdout, stderr){

    dictionary = stdout.replace('{"Status":"Success","Message":"","Result":[{', "");
    dictionary = dictionary.replace('}]}','');
    console.log(dictionary);
    dictionary = dictionary.split('},{');
    console.log(dictionary);
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
});


  
var msg = 'Hello World';
console.log(msg);