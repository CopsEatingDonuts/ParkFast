var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

var new_token = "ttdMAe3s36f54fm2Nuq-4f4s@r-cd5aKaaexzdV825-XUdbe-7v--dbdk85h4eNed-44bjJaXbj842PrW4-f46eaYw+VMdN8VyTf";
var get_token = 'curl "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2"'
child = exec(get_token, function(error, stdout, stderr){

    new_token = JSON.parse(stdout).Result;
    console.log(new_token);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    
    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    
});

module.exports = {new_token};