import React, { Component } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/header/Header";
import DashBoard from "./components/dashboard/Dashboard";
import config from "./config/config.json"
import "./config/firebaseConfig";
// import { Provider } from 'react-redux';
// // import store from './store/store';
import io from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.socket = io(`${config.APIHostName}:${config.APIHostingPort}`);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <div>
            <Header />
          </div>
          <div>
            <DashBoard />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
