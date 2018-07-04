import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import "./CreateCourse.css";

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

class QuizForm extends React.Component {
  state = {
    optionsCount: 2
  }

  handleChange = (optionKey) => event => {
    event.preventDefault();
    let value = event.target.value.trim();
    this.setState({
      [optionKey]: value
    });
  }

  addOptions = () => {
    this.setState({ optionsCount: (this.state.optionsCount + 1) })
  }

  saveQuiz = () => {
    let options = []
    let i = 1
    while (i <= this.state.optionsCount) {
      options.push(this.state[`option${i}`])
      i++
    }
    this.props.saveQuiz(options)
  }

  componentWillReceiveProps() {
    this.setState = {
      optionsCount: 2
    }
  }

  render() {
    const { classes } = this.props;
    let options = []
    let i = 1
    while (i <= this.state.optionsCount) {
      options.push(
        <TextField
          name="quiz_option"
          label={`option${i}`}
          required
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange.bind(this,`option${i}`)}
        />
      )
      i++
    }
    return (
      <React.Fragment>
        <form className={classes.container} autoComplete="off">
          <TextField
            name="quiz_question"
            required
            label="Question (Mandatory to add quiz)"
            className={classes.textField}
            margin="normal"
            onChange={this.props.handleChange.bind(this,"question")}
          />

          {options}
          <Button
            color="primary"
            className={classes.button}
            onClick={this.addOptions}
          >
            <Add />
            Add Options
          </Button>

          <TextField
            name="quiz_answer"
            label="Enter your answer (Mandatory to evaluate)"
            required
            className={classes.textField}
            margin="normal"
            onChange={this.props.handleChange.bind(this,"answer")}
          />

          <Button
            color="primary"
            className={classes.button}
            onClick={this.saveQuiz}
          >
            <Save />
            Save This Quiz
          </Button>
        </form>
      </React.Fragment>
    )
  }
}

QuizForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizForm);