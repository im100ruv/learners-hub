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
<<<<<<< HEAD
        <Header/>
        <Update/>
=======
        <CssBaseline />
        <div className="app">
          <div><Header/></div>
          <div><DashBoard/></div>
        </div>
>>>>>>> 82cc15a6308e6a78ca970146a7cd163007e09260
      </React.Fragment>

    );
  }
}
export default App;