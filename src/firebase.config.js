import firebase from 'firebase';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCUQ-vsV4VYRP16pHojugIJE_bsyL1jh0",
    authDomain: "cafe-frontend.firebaseapp.com",
    projectId: "cafe-frontend",
    storageBucket: "cafe-frontend.appspot.com",
    messagingSenderId: "756372913299",
    appId: "1:756372913299:web:2656132921e877b4a12166",
    measurementId: "G-7Z8SS2XT6X"
};

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp({});
} else {
    firebase.app(); // if already initialized, use that one
}

export const fireStore = firebase.firestore();

