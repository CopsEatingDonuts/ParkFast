import {initializeApp} from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

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
    console.log(snapshot.val());
    return;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

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
const newPostKey = push(child(ref(database), 'posts')).key;
const updates = {};
updates['/posts/' + newPostKey] = {"abc":"testing"};
update(ref(database),updates);
*/

/*
set(ref(database, 'users/' + "testing"), {
    username: "John",
    email: "abc@gmail.com"
  });
*/