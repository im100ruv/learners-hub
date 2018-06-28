import React, { Component } from 'react';
import './App.css';
import config from './config/config.json';
import firebase from 'firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import DashBoard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    // Initialize firebase
    firebase.initializeApp(config.firebaseConfig);

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <div><Header/></div>
          <div><DashBoard/></div>
        </div>
      </React.Fragment>

    );
  }
}
export default App;
