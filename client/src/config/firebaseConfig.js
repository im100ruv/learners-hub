import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCAuAb4UxMnprYKyUtw_jRqg116WVa46JA",
  authDomain: "learnershub-mountblue.firebaseapp.com",
  databaseURL: "http://learnershub-mountblue.firebaseio.com",
  projectId: "learnershub-mountblue",
  storageBucket: "learnershub-mountblue.appspot.com",
  messagingSenderId: "229870701693"
};

export default firebase.initializeApp(config);