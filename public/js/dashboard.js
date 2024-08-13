import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
	const loggedInUserId = localStorage.getItem('loggedInUserId');
	if (loggedInUserId) {
		const docRef = doc(db, "users", loggedInUserId);
		getDoc(docRef)
		.then((docSnap) => {
			if (docSnap.exists()) {
				const userData = docSnap.data();
				document.getElementById('loggedUserFName').innerText = userData.firstName;
			} else {
				console.log('No document found matching id');
			}
		})
		.catch((error) => {
			console.error('Error getting document:', error);
		})
	} else {
		console.log('User ID not found in local storage');
	}
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', (event) => {
	localStorage.removeItem('loggedInUserId');
	signOut(auth)
	.then(() => {
		window.location.href = '../public/views/index.html';
	})
	.catch((error) => {
		console.error('Error signing out:', error);
	})
});

