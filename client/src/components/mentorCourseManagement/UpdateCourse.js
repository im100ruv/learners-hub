//fetching datafor that particular Course
import React, { Component } from 'react';
import './UpdateCourse.css';
import config from '../../config/config.json';

class UpdateCourse extends Component {

    componentWillMount(){
        fetch(`${config.APIHostName}:${config.APIHostingPort}/api/courses/LC0005`)
        .then(res => { return res.json() })
        .then(result => {   
        console.log("result");
        console.log(result);
        console.log("result");
        })
    }

    render() {
        return (
        <React.Fragment>
            
        </React.Fragment>
        )
    }
}
export default UpdateCourse;
