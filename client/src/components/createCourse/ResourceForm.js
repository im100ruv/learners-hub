import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import Add from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import "./CreateCourse.css";
import QuizForm from './QuizForm';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "100%",
    boxShadow: " 2px 3px 4px 2px #c7b9b9",
    backgroundColor: "#e4f1e566",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class ResourceForm extends React.Component {
  state = {
    quizzesCount: 1,
    quiz: {
      objective: true,
      question: "",
      options: [],
      answer: ""
    }
  }

  handleChange = stateName => event => {
    let value = event.target.value.trim();
    let tempQuiz = this.state.quiz
    tempQuiz[stateName] = value
    this.setState({
      quiz: tempQuiz
    })
  }

  saveQuiz = optionsArray => event => {
    let tempQuiz = this.state.quiz
    tempQuiz.options = optionsArray
    this.setState({
      quiz: tempQuiz
    }, () => {
      this.props.saveQuiz(this.state.quiz)
    })
  }

  addQuiz = () => {
    this.setState({ quizzesCount: (this.state.quizzesCount + 1) })
  }

  componentWillReceiveProps() {
    this.setState = {
      quizzesCount: 1,
      quiz: {
        objective: true,
        question: "",
        options: [],
        answer: ""
      }
    }
  }

  render() {
    const { classes } = this.props;
    let quizzes = []
    let i = 1
    while (i <= this.state.quizzesCount) {
      quizzes.push(
        <QuizForm
          handleChange={this.handleChange}
          saveQuiz={this.saveQuiz}
        />
      )
      i++
    }
    return (
      <React.Fragment>
        <form className={classes.container} autoComplete="off">
          <p className="uploadCourse">CREATE RESOURCE</p>
          <TextField
            name="title"
            required
            label="Chapter Heading (Mandatory to add chapter)"
            value={this.props.chapter.title}
            className={classes.textField}
            margin="normal"
            onChange={this.props.handleChange("title")}
          />
          <TextField
            name="description"
            label="Describe the chapter.."
            value={this.props.chapter.description}
            multiline
            required
            rows="7"
            className="summary-text"
            margin="normal"
            onChange={this.props.handleChange("description")}
          />
          <h4>File</h4>
          <input
            accept="*"
            className={classes.input}
            id="chapter_file"
            type="file"
            onChange={this.props.handleChange("fileURL")}
          />
          <TextField
            name="chapter_file_textField"
            label="Upload a file/video related to this chapter"
            defaultValue={this.props.chapter.fileName}
            className={classes.textField}
            margin="normal"
            disabled
            value={this.props.fileName ? this.props.fileName : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <label htmlFor="chapter_file">
                    <AddCircle className={"add-icon"} />
                  </label>
                </InputAdornment>
              )
            }}
          />
          <h4> Quiz </h4>
          {quizzes}

          <Button
            color="primary"
            className={classes.button}
            onClick={this.addQuiz}
          >
            <Add />
            Add Another Quiz
          </Button>
        </form>
      </React.Fragment>
    )
  }
}

ResourceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResourceForm);