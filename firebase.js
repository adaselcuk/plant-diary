// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
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
const auth = getAuth(app);

// for signing up
document.getElementById('submitSignUp').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      document.getElementById('signUpMessage').innerHTML = 'Registered Successfully!';
      document.getElementById('signUpMessage').style.display = 'block';
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      document.getElementById('signUpMessage').innerHTML = errorMessage;
      document.getElementById('signUpMessage').style.display = 'block';
    });
});

// for signing in
document.getElementById('submitSignIn').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      document.getElementById('signInMessage').innerHTML = 'Logged In Successfully!';
      document.getElementById('signInMessage').style.display = 'block';
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      document.getElementById('signInMessage').innerHTML = errorMessage;
      document.getElementById('signInMessage').style.display = 'block';
    });
});

export { auth };

export default app;