import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCSa_kLQGTviwpdpPzt1hWNG6vVmeC-2GY",
    authDomain: "firebase-test.firebaseapp.com",
    databaseURL: "https://fir-test-a7a5a.firebaseio.com/",
    projectId: "fir-test-a7a5a",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "730754553718"
};
var fire = firebase.initializeApp(config);
export default fire;