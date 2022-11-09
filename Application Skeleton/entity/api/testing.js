//demo code to read from car park availaility file
import {initializeApp} from "firebase/app";
import { getDatabase, ref, child, get, push, update, set } from "firebase/database";

import fs from 'fs';

let rawdata = fs.readFileSync('Application Skeleton/entity/api/FinalDataSet.json');
var carParkAvail = JSON.parse(rawdata);
//console.log(carParkAvail);

var c_count = 0;
var m_count = 0;
var h_count = 0;
var y_count = 0;
var s_count = 0;
var l_count = 0;
var count_1 = 0;
var count_2 = 0;
var count_3 = 0;
var count_4 = 0;
var total = 0;
for (let i=0;i<carParkAvail.length;i++) {
    total++;
    var carparkinfo = carParkAvail[i].carpark_info;
    for (let j=0;j<carparkinfo.length;j++) {
        if ((carparkinfo[j].lot_type)=="C") c_count++;
        else if ((carparkinfo[j].lot_type)=="M") m_count++;
        else if ((carparkinfo[j].lot_type)=="H") h_count++;
        else if ((carparkinfo[j].lot_type)=="Y") y_count++;
        else if ((carparkinfo[j].lot_type)=="S") s_count++;
        else if ((carparkinfo[j].lot_type)=="L") l_count++;
    }
    if (carparkinfo.length==1) count_1++;
    else if (carparkinfo.length==2) count_2++;
    else if (carparkinfo.length==3) {
        count_3++;
        console.log(carParkAvail[i].geometries[0]);
        console.log(carParkAvail[i].Address);
    }
    else count_4++;
}
console.log("Total : "+total);
console.log("C_count : "+c_count);
console.log("M_count : "+m_count);
console.log("H_count : "+h_count);
console.log("Y_count : "+y_count);
console.log("S_count : "+s_count);
console.log("L_count : "+l_count);
console.log("count_1 : "+count_1);
console.log("count_2 : "+count_2);
console.log("count_3 : "+count_3);
console.log("count_4 : "+count_4);