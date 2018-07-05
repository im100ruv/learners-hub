import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import config from "../../config/config.json";
import "./CreateCourse.css";
import firebase from "firebase";
import swal from 'sweetalert';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "60%",
    boxShadow: " 2px 3px 4px 2px #c7b9b9",
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
    expected_duration: "1",
    level: "Beginner",
    summary: "",
    new_release: false,
    resources: [],
    instructors: [
      {
        bio:
          `As an avid programmer and learner, ${this.props.loggedUser.name} began teaching and found his passion. He enjoys the best of both worlds as he works as a Course Developer at Udacity. After earning a degree in computer science, he made the smart decision and moved into the world of HTML, CSS, and JavaScript. For over seven years he worked for an international nonprofit doing everything from frontend web development, to backend programming, to database and server management.`,
        image:
          "https://yt3.ggpht.com/a-/ACSszfHJCef_uTyAEgv2HjWg7zV8Vks0hLJ4KAx8NA=s900-mo-c-c0xffffffff-rj-k-no",
        name: this.props.loggedUser.name
      }
    ]
  };

  handleChange = stateName => event => {
    event.preventDefault();
    if (
      event.target.id === "course-duration" &&
      (event.target.value < 1 || event.target.value > 12)
    ) {
      this.setState({
        [stateName]: 1
      });
    } else if (
      event.target.id === "banner-image-file" &&
      event.target.files[0]
    ) {
      let bannerName = event.target.files[0].name;
      this.setState({
        bannerName: bannerName
      });
      let storageRef = firebase.storage().ref("courses/banners/");
      let extension = event.target.files[0].name.split(".").pop();
      let bannerImgRef = storageRef.child(`CB${Date.now()}.${extension}`);
      let uploadTask = bannerImgRef.put(event.target.files[0]);

      uploadTask.on(
        "state_changed",
        snapshot => {
          // code for progress
        },
        err => {
          // error handling here
          // use err.code to handle specific errors
        },
        () => {
          // code after upload completion
          bannerImgRef.getDownloadURL().then(url => {
            this.setState({
              [stateName]: url
            });
          });
        }
      );
    } else {
      let value = event.target.value.trim();
      this.setState({
        [stateName]: value
      });
    }
  };

  cancelUpload = () => {
    let scope = this
    if (this.state.banner_image) {
      var deleteRef = firebase.storage().refFromURL(this.state.banner_image)

      deleteRef.delete().then(function () {
        // File deleted successfully
        scope.props.setMainComp("course-list", "")
      }).catch(function (error) {
        console.log("error while deleting banner image..", error)
      });
    }
  }

  setData = () => {
    let scope = this;
    if (this.state.title.length < 1) {
      swal({
        title: "Please enter the Course name",
        icon: "warning"
      });
      return;
    }
    if (this.state.subtitle.length < 1) {
      swal({
        title: "Please add Subtitle for this course",
        icon: "warning"
      });
      return;
    }
    if (this.state.syllabus.length < 1) {
      swal({
        title: "Please define Syllabus for this course",
        icon: "warning"
      });
      return;
    }
    if (this.state.required_knowledge.length < 1) {
      swal({
        title: "Please add Required Knowledge field for this course",
        icon: "warning"
      });
      return;
    }
    if (this.state.expected_learning.length < 1) {
      swal({
        title: "Please fill Expected Learning field for this course",
        icon: "warning"
      });
      return;
    }
    if (this.state.categories.length < 1) {
      swal({
        title: "Please add Categories for this course",
        icon: "warning"
      });
      return;
    }
    if (this.state.expected_duration.length < 1) {
      swal({
        title: "Please add the Course Duration",
        icon: "warning"
      });
      return;
    }
    if (this.state.summary.length < 1) {
      swal({
        title: "Please give Summary of the course",
        icon: "warning"
      });
      return;
    }
    let key = ""
    firebase
      .storage()
      .ref("courses/banners/")
      .child("default.jpg")
      .getDownloadURL()
      .then(url => {
        let bannerURL = this.state.banner_image;
        if (this.state.banner_image === "") {
          bannerURL = url;
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
            key = this.state.key
            fetch(
              `${config.APIHostName}:${config.APIHostingPort}/api/courses`,
              {
                method: "post",
                body: JSON.stringify(this.state),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
              .then(function (response) {
                fetch(`${config.APIHostName}:${config.APIHostingPort}/api/users/courses/authored`, {
                  method: "put",
                  body: JSON.stringify({email: this.props.loggedUser.email, course: {key: key}}),
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).then(res => {
                  swal({
                    title: "Course Successfully Uploaded",
                    text: "Please add contents to course.",
                    icon:"success"
                  })
                  scope.props.setMainComp("create-resource", key);
                }).catch(errr => {
                  swal("Course uploaded but not added to my Course list");
                });
              })
              .catch(err => {
                swal("Course not uploaded");
              });
          }
        );
      });
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
          required
          className={classes.textField}
          margin="normal"
          multiline
          onChange={this.handleChange("syllabus")}
        />

        <TextField
          id="required-knowledge"
          label="Required knowledge for this course"
          className={classes.textField}
          margin="normal"
          multiline
          required
          onChange={this.handleChange("required_knowledge")}
        />
        <TextField
          id="expected-learning"
          label="Expected learning"
          placeholder="What will user get after completing this course?"
          className={classes.textField}
          margin="normal"
          multiline
          required
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
          id="course-duration"
          label="Course Duration in months"
          helperText="Enter only number between 1 to 12"
          type="number"
          value={this.state.expected_duration}
          //  InputProps={{ inputProps: { min: 0, max: 10 } }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          required
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
          label="Summary of course"
          multiline
          required
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
            onClick={this.cancelUpload}
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
            Next (course contents)
            <ArrowForward />
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
