import React, { Component } from 'react';
import './App.css';
import CourseDetail from './components/courseDetail/CourseDetail'
import CourseResource from './components/courseResource/CourseResource'

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <CourseDetail courseKey={"LC0006"} /> */}
        <CourseResource courseKey={"LC0006"} />
      </div>
    );
  }
}

export default App;
