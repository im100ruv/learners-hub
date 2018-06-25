import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FileUpload from "@material-ui/icons/FileUpload";
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./CreateCourse.css";

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

class CreateCourse extends React.Component {
  state = {
    key: "LC0008",
    title: "",
    subtitle:"",
    banner_image:"",
    categories: "",
    syllabus:"",
    required_knowledge:"",
    expected_learning:"",
    expected_duration: "",
    level: "Beginner",
    summary: "",
    new_release:false,
    full_course_available:true,
    expected_duration_unit:"months",
    file: []
  };
  handleChange = stateName => event => {
    event.preventDefault();
    this.setState({
      [stateName]: event.target.value.trim()
    });
    return;
  };
  setData = () => {
    this.setState(
      {
        categories: this.state.categories.split(",").map(category => {
          return category.trim();
        })
      },
      () => {
        console.log(this.state);
        fetch("http://localhost:8000/api/courses", {
          method: "post",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(response) {
          console.log("data send into database");
        });
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} autoComplete="off">
        <p className="uploadCourse">UPLOAD NEW COURSE</p>
        <TextField
          id="title"
          label="Name of Course"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange("title")}
        />
        <TextField
          id="subtitle"
          label="Subtitle of Course"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange("subtitle")}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="banner-image-file"
          multiple
          type="file"
          onChange={this.handleChange("banner_image")}
        />
        <TextField
          id="banner-image"
          label="Upload banner image for this course"
          className={classes.textField}
          margin="normal"
          disabled
          value={this.state.banner_image}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="banner-image-file">
                  <AddCircle />
                </label>
              </InputAdornment>
            )
          }}
        />
       
        <TextField
          id="syllabus"
          label="Syllabus"
          className={classes.textField}
          margin="normal"
          multiline
          onChange={this.handleChange("syllabus")}
        />
         <input
          accept="image/*"
          className={classes.input}
          id="course-file"
          multiple
          type="file"
          onChange={this.handleChange("file")}
        />
        <TextField
          id="uploadCourse"
          label="Upload course file"
          className={classes.textField}
          margin="normal"
          disabled
          value={this.state.file}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="course-file">
                  <AddCircle />
                </label>
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="required-knowledge"
          label="Required knowledge for this course"
          className={classes.textField}
          margin="normal"
          multiline
          onChange={this.handleChange("required_knowledge")}
        />
         <TextField
          id="expected-learning"
          label="Expected learning"
          placeholder="What will user get after completing this course?"
          className={classes.textField}
          margin="normal"
          multiline
          onChange={this.handleChange("expected_learning")}
        />
        <TextField
          id="categories"
          label="Categories"
          className={classes.textField}
          placeholder="Enter comma seperated course category"
          margin="normal"
          onChange={this.handleChange("categories")}
        />
        <TextField
          id="number"
          label="Course Duration in months"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          onChange={this.handleChange("expected_duration")}
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
          onChange={this.handleChange("level")}
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
          onChange={this.handleChange("summary")}
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
