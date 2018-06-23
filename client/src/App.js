import React, { Component } from 'react';
import ListCourses from './components/courseList/CourseList';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className="app">
        <ListCourses/>
      </div>
    );
  }
}
export default App;