import firebase from 'firebase';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAereuRAsJwgwATnUBNPNmTZV7ndhm4q2A",
    authDomain: "line-ef414.firebaseapp.com",
    projectId: "line-ef414",
    storageBucket: "line-ef414.appspot.com",
    messagingSenderId: "1036900378343",
    appId: "1:1036900378343:web:28f5139fe5a21625282442",
    measurementId: "G-357E5YFKPG"
};

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp({});
} else {
    firebase.app(); // if already initialized, use that one
}

export const fireStore = firebase.firestore();
export const analytics = firebase.analytics();
