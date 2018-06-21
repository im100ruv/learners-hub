import React, { Component } from 'react';
import './App.css';
import CourseDetail from './components/courseDetail/CourseDetail'

class App extends Component {
  render() {
    return (
      <div className="app">
        <CourseDetail courseKey={"LC0006"} />
      </div>
    );
  }
}

export default App;
