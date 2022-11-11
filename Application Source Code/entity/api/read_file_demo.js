//demo code to read from car park availaility file
import {initializeApp} from "firebase/app";
import { getDatabase, ref, child, get, push, update, set } from "firebase/database";

import fs from 'fs';

let rawdata = fs.readFileSync('Application Skeleton/entity/api/AvailabilityWithRates.json');
console.log(typeof(rawdata));
var carParkAvail = JSON.parse(rawdata);
//console.log(carParkAvail);

for (let i=0;i<carParkAvail.length;i++) {
  console.log(carParkAvail[i].Address);
}


const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://sc2006-22428-default-rtdb.asia-southeast1.firebasedatabase.app/",
    //https://sc2006-22428-default-rtdb.asia-southeast1.firebasedatabase.app/
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase());

// update database with the results ^
function writeUserData() {
    set(dbRef, {
      "Result": carParkAvail
    });
    return;
  }
  
writeUserData();
