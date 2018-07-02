import React, { Component } from 'react';
import './App.css';
import './config/firebaseConfig';
import firebase from 'firebase';
import Mentor from './components/mentorCourseManagement/MentorCourseManagement';
import Header from './components/header/Header';
import Update from './components/mentorCourseManagement/UpdateCourse';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Update/>
      </React.Fragment>
    );
  }
}
export default App;