import React, { Component } from 'react';
import './App.css';
import config from './config/config.json';
import firebase from 'firebase';
import Mentor from './components/mentorCourseManagement/MentorCourseManagement';
import Header from './components/header/Header';
import Update from './components/mentorCourseManagement/UpdateCourse';

class App extends Component {
  render() {
    firebase.initializeApp(config.firebaseConfig);
    return (
      <React.Fragment>
        <Header/>
        <Update/>        
      </React.Fragment>
    );
  }
}
export default App;
