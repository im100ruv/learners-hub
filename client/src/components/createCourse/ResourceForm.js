import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
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

class ResourceForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form className={classes.container} autoComplete="off">
          <p className="uploadCourse">CREATE RESOURCE</p>
          <TextField
            name="title"
            required
            label="Chapter Heading"
            className={classes.textField}
            margin="normal"
            onChange={this.props.handleChange("title")}
          />
          <TextField
            name="description"
            label="Describe the chapter.."
            multiline
            rows="7"
            className="summary-text"
            margin="normal"
            onChange={this.props.handleChange("description")}
          />
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
          <TextField
            name="quiz_question"
            label="Enter a question"
            className={classes.textField}
            margin="normal"
            onChange={this.props.handleChange("question")}
          />
        </form>
      </React.Fragment>
    )
  }
}

ResourceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResourceForm);