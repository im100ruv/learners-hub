import React from 'react';
import './CourseResource.css';
import Button from '../materialUIComponents/Button';

export default class Chapter extends React.Component {
  state = {
  }
  render() {
    return (
      <React.Fragment>
        <h2>{this.props.index+1}. {this.props.resource.title}</h2>
        <p>{this.props.resource.description}</p>
        <br />
        {this.props.resource.fileURL ? (
          <div className="chapter-container">
            <a href={this.props.resource.fileURL} target="blank">{this.props.resource.fileName}</a>
            <div className="object-container">
              <object data={this.props.resource.fileURL} type="" width="100%" height="100%">
                This browser does not support the above file-type. Please download the file to view it: <a href={this.props.resource.fileURL}>Download PDF</a>
              </object>
            </div>
          </div>
        ) : ""}
        <h3>Quiz</h3>
        <p>{this.props.resource.quiz[0].question}</p>
        <p>{this.props.resource.quiz[0].options}</p>
        <center><Button setMainComp={this.props.setMainComp} courseKey={this.props.courseKey} buttonValue="Submit" destination="course-quiz" /></center>
      </React.Fragment>
    )
  }
}