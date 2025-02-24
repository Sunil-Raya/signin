// logout function
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3G8ASi6BFzvIkrN6wRrKV62CfEWjkyFU",
    authDomain: "flower-seller-b99dd.firebaseapp.com",
    projectId: "flower-seller-b99dd",
    storageBucket: "flower-seller-b99dd.firebasestorage.app",
    messagingSenderId: "214120438980",
    appId: "1:214120438980:web:4954430a37b9ec6b4dbd91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("logedInUserId");
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.querySelector("#loggedUserName").innerHTML = userData.userName;
                    document.querySelector("#loggedUserEmail").innerHTML = userData.email;
                }
                else {
                    console.log("no document found matching id");
                }
            })
            .catch((error) => {
                console.log("error getting document");
            })
    }
    else {
        console.log("User id not found in local storage");
    }
}) 

const logOut = document.querySelector("#logout");

logOut.addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
    .then (() => {
        window.location.href = "index.html";
    })
})