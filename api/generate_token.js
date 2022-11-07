import http from 'http';
import util from 'util';
import exec from 'child_process';

import fs from 'fs';
import readline from 'readline';

const rd = readline.createInterface({
    input: fs.createReadStream('./api\\new_token.txt'),
    output: process.stdout,
    console: false
});

// code below only needs to be used once a day to generate token
// token value is stored in the variable 'new_token'
// new_token generated should be placed in the variable 'command'

//var new_token = 'HBfad-eDpF48acAbaFe4ANYBdbd4FGwYafv43ebv8N-uZf2Zb5849fJeV8KBGa+AdArgaSg23eu-c8beRPn8KUkYe8edmab9pmf9';
var get_token = 'curl "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -H "AccessKey: dd528ffa-bad4-4e39-baeb-dfb9804afea2"'
exec.exec(get_token, function(error, stdout, stderr){

    var new_token = JSON.parse(stdout).Result;
    console.log(new_token);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if(error !== null)
    {
        console.log('exec error: ' + error);
    }
    fs.writeFile('./api\\new_token.txt', new_token, function(){});
});

//module.exports = {new_token};
