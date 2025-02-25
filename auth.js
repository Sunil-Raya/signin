// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3G8ASi6BFzvIkrN6wRrKV62CfEWjkyFU",
  authDomain: "flower-seller-b99dd.firebaseapp.com",
  projectId: "flower-seller-b99dd",
  storageBucket: "flower-seller-b99dd.firebasestorage.app",
  messagingSenderId: "214120438980",
  appId: "1:214120438980:web:4954430a37b9ec6b4dbd91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const submitButton = document.querySelector("#submit");

// forms
const signupForm = document.getElementById("signup-form");   // Signup form section
const loginForm = document.getElementById("login-form");     // Login form section

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const emailInput = document.querySelector("#signup-email").value;
  const passwordInput = document.querySelector("#signup-password").value;
  const usernameInput = document.querySelector("#signup-username").value;

  const auth = getAuth();
  const db = getFirestore();

  // Create the user with Firebase Authentication
  createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((userCredential) => {
      const user = userCredential.user;

      // Prepare user data to save to Firestore, including the password
      const userData = {
        email: emailInput,
        userName: usernameInput,
        password: passwordInput,  // Storing the password directly
      };

      showMessage('Account created Successfully', 'signUpMessage');

      // Save user data to Firestore
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        showMessage("Email address already exists", "signUpMessage");
      }
      else {
        showMessage("Unable to create account", "signUpMessage");
      }
    })
});

const loginBtn = document.querySelector("#login-button");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const loginEmail = document.querySelector("#login-email").value;
  const loginPass = document.querySelector("#login-password").value;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, loginEmail, loginPass)
    .then((userCredential) => {
      showMessage("Login is successful", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem('logedInUserId', user.uid);
      setTimeout(() => {
        window.location.href = "homepage.html";
      }, 2000)
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        showMessage("Incorrect email or password", "signInMessage");
      } else if (errorCode === 'auth/user-not-found') {
        showMessage("Account doesn't exist", "signInMessage");
      } else {
        showMessage("An error occurred. Please try again.", "signInMessage");
      }
    })
});
