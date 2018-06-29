import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FileUpload from "@material-ui/icons/FileUpload";
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import config from "../../config/config.json";
import "./CreateCourse.css";
import firebase from 'firebase';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "50%",
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
    key: "LC",
    title: "",
    subtitle: "",
    banner_image: "",
    bannerName: "",
    categories: "",
    syllabus: "",
    required_knowledge: "",
    expected_learning: "",
    expected_duration: "",
    level: "Beginner",
    summary: "",
    new_release: false,
    full_course_available: true,
    expected_duration_unit: "months",
    resources: [],
    resourcesName: '',
    instructors: [
      {
        bio:
          "As an avid programmer and learner, Himanshu mukat began teaching and found his passion. He enjoys the best of both worlds as he works as a Course Developer at Udacity. After earning a degree in computer science, he made the smart decision and moved into the world of HTML, CSS, and JavaScript. For over seven years he worked for an international nonprofit doing everything from frontend web development, to backend programming, to database and server management. Before graduating from the University of Florida’s Web Design and Online Communications Master’s program with a degree in Mass Communication, he had already been asked by the University to come on board as a faculty member. Even with the planning, building and development of courses, he still tries to make time to take in the beauty of the California countryside.",
        image:
          "https://yt3.ggpht.com/a-/ACSszfHJCef_uTyAEgv2HjWg7zV8Vks0hLJ4KAx8NA=s900-mo-c-c0xffffffff-rj-k-no",
        name: "Himanshu Mukat"
      }
    ]
  };

  handleChange = stateName => event => {
    event.preventDefault();
    if (event.target.id === "banner-image-file" && event.target.files[0]) {
      let bannerName = event.target.files[0].name;
      this.setState({
        bannerName: bannerName
      });
      let storageRef = firebase.storage().ref('courses/banners/')
      let extension = event.target.files[0].name.split('.').pop()
      let bannerImgRef = storageRef.child(`CB${Date.now()}.${extension}`)
      let uploadTask = bannerImgRef.put(event.target.files[0])

      uploadTask.on('state_changed', snapshot => {
        // code for progress
      }, err => {
        // error handling here
        // use err.code to handle specific errors
      }, () => {
        // code after upload completion
        bannerImgRef.getDownloadURL().then(url => {
          this.setState({
            [stateName]: url,
          });
        })
      })
    } else if (event.target.id === "course-resources" && event.target.files[0]) {
      let resourcesName = "";
      for (const key in Object.keys(event.target.files)) {
        resourcesName = resourcesName + event.target.files[key].name + "\n";
      }
      this.setState({
        resourcesName: resourcesName
      });

      let storageRef = firebase.storage().ref(`courses/resources/CRF${Date.now()}/`)
      //this async task may create problems
      storageRef.getDownloadURL().then(url => {
        this.setState({
          resourceFolderURL: url
        });
      })
      
      let value = []
      for (const key in Object.keys(event.target.files)) {
        let file = event.target.files[key]

        let resourceRef = storageRef.child(file.name)
        let uploadTask = resourceRef.put(file)

        uploadTask.on('state_changed', snapshot => {
          // code for progress
        }, err => {
          // error handling here
          // use err.code to handle specific errors
        }, () => {
          // code after upload completion
          resourceRef.getDownloadURL().then(url => {
            value.push({
              name: file.name,
              URL: url
            })
            this.setState({
              [stateName]: value
            });
          })
        })
      }
    } else {
      let value = event.target.value.trim()
      this.setState({
        [stateName]: value
      });
    }
  };

  setData = () => {
    let scope = this;
    if (this.state.title.length < 1) {
      alert("Please give the course name");
      return;
    }
    if (this.state.subtitle.length < 1) {
      alert("Please give the Subtitle name for this course");
      return;
    }
    if (this.state.categories.length < 1) {
      alert("Please give some categories for this course");
      return;
    }
    firebase.storage().ref('courses/banners/').child('default.jpg').getDownloadURL().then(url => {
      let bannerURL = this.state.banner_image
      if (this.state.banner_image === "") {
        bannerURL = url
      }
      this.setState(
        {
          key: `CK${Date.now()}`,
          banner_image: bannerURL,
          categories: this.state.categories.split(",").map(category => {
            return category.trim();
          })
        },
        () => {
          fetch(`${config.APIHostName}:${config.APIHostingPort}/api/courses`, {
            method: "post",
            body: JSON.stringify(this.state),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(function (response) {
            alert('Course uploaded successfully.');
            scope.props.setMainComp("course-list", "");
          })
            .catch(err => {
              alert("Course not uploaded");
            });
        }
      );
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} autoComplete="off">
        <p className="uploadCourse">UPLOAD NEW COURSE</p>
        <TextField
          id="title"
          required
          label="Name of Course"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange("title")}
        />
        <TextField
          id="subtitle"
          required
          label="Subtitle of Course"
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange("subtitle")}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="banner-image-file"
          type="file"
          onChange={this.handleChange("banner_image")}
        />
        <TextField
          id="banner-image"
          label="Upload banner image for this course"
          className={classes.textField}
          margin="normal"
          disabled
          value={this.state.bannerName ? this.state.bannerName : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="banner-image-file">
                  <AddCircle className={"add-icon"} />
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
          accept="*"
          className={classes.input}
          id="course-resources"
          multiple
          type="file"
          onChange={this.handleChange("resources")}
        />
        <TextField
          id="uploadCourse"
          label="Upload course file"
          className={classes.textField}
          margin="normal"
          disabled
          multiline
          value={this.state.resourcesName}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="course-resources">
                  <AddCircle className={"add-icon"} />
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
          required
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
          className="summary-text"
          margin="normal"
          onChange={this.handleChange("summary")}
        />
        <div className="uploadButton">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.props.setMainComp.bind(this, "course-list", "")}
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
