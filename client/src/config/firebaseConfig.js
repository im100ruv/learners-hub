import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDe5JVZ7LNZsq0PYGgHCkdMYX12S2I7wv8",
  authDomain: "learnershub-asak.firebaseapp.com",
  databaseURL: "https://learnershub-asak.firebaseio.com",
  projectId: "learnershub-asak",
  storageBucket: "learnershub-asak.appspot.com",
  messagingSenderId: "956250822535"
};

export default firebase.initializeApp(config);