import React, { Component } from 'react';
import './App.css';
import CreateCourse from './components/createCourse/CreateCourse'

class App extends Component {
  render() {
    return (
      <div className="app">
        <CreateCourse/>
      </div>
    );
  }
}

export default App;
