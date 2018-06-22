import React, { Component } from 'react';
import List_Courses from './components/courseList/courseList';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className="app">
        <List_Courses/>
      </div>
    );
  }
}
export default App;