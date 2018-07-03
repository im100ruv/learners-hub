import React from 'react';
import './CourseResource.css';
import Button from '../materialUIComponents/Button';
import RadioGroup from './RadioGroup';

export default class Chapter extends React.Component {
  state = {
    userInputGiven: false,
    questionsSolvedIndexes: []
  }

  setChoosenValue = (val, index) => {
    this.setState({ userInputGiven: true })
    let solved = this.state.questionsSolvedIndexes
    if ((val === this.props.resource.quiz[index].answer) && !solved.includes(index)) {
      solved.push(index)
      this.setState({ questionsSolvedIndexes: solved })
    } else if ((val !== this.props.resource.quiz[index].answer) && solved.includes(index)) {
      solved = solved.filter(item => item !== index)
      this.setState({ questionsSolvedIndexes: solved })
    }
  }

  validateAnswer = (dummy1, dummy2) => {
    if (this.state.questionsSolvedIndexes.length === this.props.resource.quiz.length) {
      this.props.setAnsweredCorrect()
    }
  }

  componentWillReceiveProps() {
    this.setState({
      userInputGiven: false,
      questionsSolvedIndexes: []
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.index + 1}. {this.props.resource.title}</h2>
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
        {this.props.resource.quiz.map((item, index) => {
          return (
            <div key={index}>
              <h4>{index + 1}. {this.props.resource.quiz[index].question}</h4>
              <RadioGroup options={this.props.resource.quiz[index].options} setChoosenValue={this.setChoosenValue} index={index} />
            </div>
          )
        })}
        <center><Button disabled={!this.state.userInputGiven} setMainComp={this.validateAnswer} courseKey={this.props.courseKey} buttonValue="Submit" destination="" /></center>
      </React.Fragment>
    )
  }
}