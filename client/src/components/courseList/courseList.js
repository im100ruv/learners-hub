import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Course from './course';
import './course.css';

class courseList extends Component {
  
  constructor(props){
      super(props);
      //setState Here
      this.state = {
        array_course: []
      }
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/courses')
    .then((res) => { return res.json() })
    .then((result) =>
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
      <div className="container">
           <Typography style={{ fontSize : '38px', fontStyle: 'TimesNewRoman', color: 'Yellow' }} variant="display1" color="primary">List of Courses provided by LearnersHub </Typography>
           <br/>
           <Course elements={scope.state.array_course}/>
      </div>
    );
  }
}
export default courseList;