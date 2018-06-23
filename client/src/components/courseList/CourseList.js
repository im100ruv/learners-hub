import React, { Component } from 'react';
import Snackbar from '@material-ui/core/SnackbarContent';
import Course from './Course';
import './Course.css';

class courseList extends Component {
  constructor(props){
      super(props);
      this.state = {
        array_course: []
      }
  }

  heading_style = {
                    minWidth:'fit-content',
                    color:'white',
                    fontSize:'38px',
                    fontWeight:'bold',
                    fontFamily:'TimesNewRoman',
                    height:'1.5em',
                    margin:'auto'
  }

  content_style = {
    width:'70%',
    margin: '45px auto 0px auto'
  }

 componentDidMount(){
    fetch('http://localhost:8000/api/courses')
    .then(res => { return res.json() })
    .then(result =>
     {
        this.setState({
          array_course : result
        })
     })
    }

  render()
  {
    let scope = this;
    return (
      <div style={this.content_style}>
           <Snackbar style={this.heading_style} message={'List Of Courses Delivered By LearnersHub' } ></Snackbar>
           <br/>
           <Course elements={scope.state.array_course}/>
      </div>
    );
  }
}
export default courseList;