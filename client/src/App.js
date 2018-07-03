import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import DashBoard from './components/dashboard/Dashboard';
import './config/firebaseConfig';
// import { Provider } from 'react-redux';
// // import store from './store/store';
// import socket from 'socket.io';

// const socket =io.connect("http://localhost:8000");
import SocketIOClient from 'socket.io-client';
class App extends Component {
constructor(){
  super();
this.socket = SocketIOClient('http://localhost:8000');
}
  
 render() {

   return (
     <React.Fragment>
       <CssBaseline />
       <div className="app">
         <div><Header/></div>
         <div><DashBoard/></div>
       </div>
     </React.Fragment>

   );
 }
}
export default App;