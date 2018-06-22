import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Course from './course';
import './course.css';

class courseList extends Component {
  constructor(props){
      super(props);
      this.state = {
        array_course: []
      }
  }

  heading_style = { position:'relative',
                    left:'10%',
                    fontSize : '38px',
                    fontWeight: 'bold',
                    color: 'Yellow'
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
      <div className="container">
           <Typography style={this.heading_style} variant="display1" color="primary">List of Courses provided by LearnersHub </Typography>
           <br/>
           <Course elements={scope.state.array_course}/>
      </div>
    );
  }
}
export default courseList;