import React from 'react';
import './CourseResource.css';
import Button from '../materialUIComponents/Button';
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import RadioGroup from './RadioGroup';
import sweetAlert from 'sweetalert';

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
      sweetAlert({ title: "Congratulations", icon: "success" })
    } else {
      sweetAlert({ title: "Wrong answer", icon: "error" })
    }
  }

  showAnswer = () => {
    let answer = ""
    this.props.resource.quiz.forEach((item, index) => {
      answer += (index + 1) + ". " + item.answer + "\n"
    })
    sweetAlert("Answers", answer, "info")
  }

  componentWillReceiveProps() {
    this.setState({
      userInputGiven: false,
      questionsSolvedIndexes: []
    })
  }

  render() {
    const { classes } = this.props;
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

        {this.props.resource.assignment.question !== "" ? (
          <div>
            <h3>Assignment</h3>
            <h4>{this.props.resource.assignment.question}</h4>
            <input
              accept="*"
              className={classes.input}
              id="assignment_file"
              type="file"
              onChange={""}
            />
            <TextField
              name="assignment_file_textField"
              label="Upload your assignment file"
              className={classes.textField}
              margin="normal"
              disabled
              value={""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <label htmlFor="assignment_file">
                      <AddCircle className={"add-icon"} />
                    </label>
                  </InputAdornment>
                )
              }}
            />
          </div>
        ) : ""}

        {this.props.resource.quiz.length > 0 ? (
          <div>
            <h3>Quiz</h3>
            {this.props.resource.quiz.map((item, index) => {
              return (
                <div key={index}>
                  <h4>{index + 1}. {this.props.resource.quiz[index].question}</h4>
                  {this.props.resource.quiz[index].objective === true ? (
                    <RadioGroup options={this.props.resource.quiz[index].options} setChoosenValue={this.setChoosenValue} index={index} />
                  ) : (
                    // Textfield here
                    ""
                  )}
                </div>
              )
            })}
          </div>
        ) : ""}
        <br />
        <p className="label-button" onClick={this.showAnswer}>Show Answer</p>
        <center><Button disabled={!this.state.userInputGiven} setMainComp={this.validateAnswer} courseKey={this.props.courseKey} buttonValue="Submit" destination="" /></center>
      </React.Fragment>
    )
  }
}