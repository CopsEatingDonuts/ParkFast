import {initializeApp} from "firebase/app";
import { getDatabase, ref, child, get, push, update, set } from "firebase/database";
import {sortCarParkAvail} from "../Application Skeleton/entity/api/SearchByDistance.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://sc2006-22428-default-rtdb.asia-southeast1.firebasedatabase.app/",
  //https://sc2006-22428-default-rtdb.asia-southeast1.firebasedatabase.app/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

// read database
get(dbRef).then((snapshot) => {
  if (snapshot.exists()) {
    //snapshot.val() is the database
    var carParkAvail = snapshot.val();
    //console.log(typeof(carParkAvail));
    var carParkAvail = sortCarParkAvail(1.3138921701076636, 103.88178786007539);
    console.log(carParkAvail[0]);
    console.log(carParkAvail[1]);
    console.log(carParkAvail[2]);
    return;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
/*
var carParkAvail = sortCarParkAvail(carparkstest, 1.3138921701076636, 103.88178786007539);
console.log(carParkAvail[0]);
console.log(carParkAvail[1]);
console.log(carParkAvail[2]); */


/*
function writeNewPost(uid, username, picture, title, body) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(db), updates);
} */



/*
const newPostKey = push(child(dbRef, 'Result')).key;
const updates = {};
updates['/Result/' + newPostKey] = {"abc":"testing"};
update(dbRef,updates);
*/
/*
function writeUserData() {
  set(dbRef, {
    "Result": '[{"carparkNo":"A0046"}]'
  });
}

writeUserData();
*/