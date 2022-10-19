var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

// code below only needs to be used once a day to generate token
// token value is stored in the variable 'new_token'
// new_token generated should be placed in the variable 'command'

var new_token = '99FKKkN04eja-bNz9484-2@NQs9dh@7a3drsQn2ddNdxa+kU+z+W8v893Jk2HbbE5438JjJe-dPW4z8VamaTpRAa4fXa94d92t-U';
var get_token = 'curl "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2"'
exec(get_token, function(error, stdout, stderr){

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