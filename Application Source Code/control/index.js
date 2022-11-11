import { initializeApp } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js';
import { getFirestore, collection, getDocs} from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBWImFGqsTT5oRab27BVDjzlicbegDW9qM",
    authDomain: "parkfast-23bd8.firebaseapp.com",
     databaseURL: "https://parkfast-23bd8-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "parkfast-23bd8",
     storageBucket: "parkfast-23bd8.appspot.com",
      messagingSenderId: "333155544674",
     appId: "1:333155544674:web:5cbbd8995095e3cd4c2b3b",
      measurementId: "G-5K5M61GXK1"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const todosCol = collection (db, 'todos');
const snapshot = await getDocs(todosCol);

onAuthStateChanged(auth, user =>{
    if (user != null){
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});

