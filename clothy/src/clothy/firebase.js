import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAF9pQwstuT4w4jzfA_NnlnGUtap4uQV4Y",
    authDomain: "amoireko-ed478.firebaseapp.com",
    databaseURL: "https://amoireko-ed478.firebaseio.com",
    projectId: "amoireko-ed478",
    storageBucket: "amoireko-ed478.appspot.com",
    messagingSenderId: "120206565215"
  };
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;