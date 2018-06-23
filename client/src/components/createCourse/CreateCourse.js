import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FileUpload from "@material-ui/icons/FileUpload";
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import red from "@material-ui/core/colors/red";
import "./CreateCourse.css";

const primary = red[500]; // #F44336

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "40%",
    border: "1px ridge",
    backgroundColor: "#e4f1e566",
    marginTop: "1em"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: "100%"
  },
  discBorder: {
    marginLeft: "10px"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const diffLevel = [
  {
    value: "Beginner",
    label: "Beginner"
  },
  {
    value: "Intermediate",
    label: "Intermediate"
  },
  {
    value: "Advance",
    label: "Advance"
  }
];
const categories = [
  {
    value: "Java",
    label: "Java"
  },
  {
    value: "React JS",
    label: "React JS"
  },
  {
    value: "MongoDB",
    label: "MongoDB"
  }
];

class CreateCourse extends React.Component {
  state = {
    courseName: "",
    courseCategory:"",
    courseURL:"",
    courseDuration:"",
    diffecultyLevel:"Beginner",
    summary:"",
    
  };
  handleChange = stateName => event => {
    event.preventDefault();
    this.setState({
      [stateName]: event.target.value.trim(),
    });
    return;
  };
  setData=()=>{
    console.log(this.state);
  }
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <p className="uploadCourse">UPLOAD NEW COURSE</p>
        <TextField
          id="courseName"
          label="Name of Course"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange('courseName')}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="flat-button-file"
          multiple
          type="file"
        />
        <TextField
          id="uploadCourse"
          label="Upload course file"
          className={classes.textField}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="flat-button-file">
                  <AddCircle />
                </label>
              </InputAdornment>
            )
          }}
        />

        {/* <label htmlFor="flat-button-file">
        <Button component="span" className={classes.button}>
          Upload
        </Button>
      </label> */}
        <TextField
          id="courseURL"
          label="Course URL"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange('courseURL')}
        />

        <TextField
          id="categories"
          label="Categories"
          className={classes.textField}
          value={this.state.categories}
          
          placeholder="Enter comma seperated course category"
          margin="normal"
          onChange={this.handleChange('courseCategory')}
        >
          
        </TextField>
        <TextField
          id="number"
          label="Course Duration in months"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          onChange={this.handleChange('courseDuration')}
        />
        <TextField
          id="diffecultyLevel"
          select
          label="diffeculty level"
          className={classes.textField}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
          onChange={this.handleChange('diffecultyLevel')}
        >
          {diffLevel.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="summary"
          label="summary of course"
          multiline
          rows="7"
          className={[classes.textField, classes.discBorder]}
          margin="normal"
          onChange={this.handleChange('summary')}
        />
        <div className="uploadButton">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Cancel
            <Delete />
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.setData}
          >
            Upload
            <FileUpload />
          </Button>
        </div>
      </form>
    );
  }
}

CreateCourse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateCourse);
