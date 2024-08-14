// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { showMessage } from "./public/js/register.js";
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
        sendEmailVerification(user)
        .then(() => {
          showMessage('Verification email sent. Please check your email.', 'signUpMessage');
          window.location.href = 'register.html';
        })
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
    if (user.emailVerified) {
      showMessage('Signed in successfully', 'signInMessage');
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'dashboard.html';
    } else {
      showMessage('Please verify your email before signing in.', 'signInMessage');
      auth.signOut();
    }
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


const submitRecover = document.getElementById('submitRecover');
submitRecover.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('recoverEmail').value;
  const auth = getAuth();

  sendPasswordResetEmail(auth, email)
  .then(() => {
    showMessage('Password recovery email sent. Please check your email.', 'recoverMessage');
  })
  .catch((error) => {
    console.error("Error during password recovery", error);
    showMessage('Unable to send recovery email. Please try again', 'recoverMessage');
  });
});


export { auth, createUserWithEmailAndPassword };

export default app;