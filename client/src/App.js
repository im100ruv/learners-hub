import React, { Component } from 'react';
import ListCourses from './components/courseList/courseList';
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