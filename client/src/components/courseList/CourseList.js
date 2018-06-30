import React, { Component } from 'react';
import Snackbar from '@material-ui/core/SnackbarContent';
import Course from './Course';
import './Course.css';
import CircularProgress from '../materialUIComponents/CircularProgress';
import config from '../../config/config.json';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array_course: []
    }
  }

  heading_style = {
                    minWidth:'fit-content',
                    color:'white',
                    fontSize:'2em',
                    fontWeight:'bold',
                    fontFamily:'TimesNewRoman',
                    height:'1.5em',
                    margin:'auto'
  }

  content_style = {
    width: '70%',
    margin: '45px auto 0px auto'
  }

  componentDidMount() {
    fetch(`${config.APIHostName}:${config.APIHostingPort}/api/courses`)
      .then(res => { return res.json() })
      .then(result => {
        this.setState({
          array_course: result
        })
      })
  }

  render() {
    let scope = this;
    return this.state.array_course.length > 0 ?(
      <div style={this.content_style}>
        <Snackbar style={this.heading_style} message={'List Of Courses Delivered By LearnersHub'} ></Snackbar>
        <br />
        <Course elements={scope.state.array_course} setMainComp={this.props.setMainComp} />
      </div>
    ) : (<CircularProgress />);
  }
}
export default CourseList;