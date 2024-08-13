// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  message.style.display = 'block';
  messageDiv.innerHTML = message;
  message.style.opacity = 1;
  setTimeout(function() {
    message.style.opacity = 0;
  }, 5000);
}

// for signing up
const signUp = document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account created successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
      .then(() => {
        window.location.href = 'index.html'; // DO I HAVE TO HAVE ANOTHER SIGN IN HTML??? - BECAUSE THIS DIRECTS TO MAIN PAGE AGAIN
      })
      .catch((error) => {
        console.error("error writing document", error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode =='auth/email-already-in-use') {
        showMessage('Email already in use', 'signUpMessage');
      } else {
        showMessage('Unable to create user. Please try again', 'signUpMessage');
      }
    })
});

// for signing in
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    showMessage('Signed in successfully', 'signInMessage');
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = 'dashboard.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-credential') {
      showMessage('Incorrect Email or Password', 'signInMessage');
    } else {
      showMessage('Unable to sign in. Please try again', 'signInMessage');
    }
  })
})

export { auth };

export default app;