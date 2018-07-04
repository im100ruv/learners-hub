import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Send from "@material-ui/icons/Send";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import config from "../../config/config.json";
import "./CreateCourse.css";
import firebase from "firebase";
import ResourceForm from './ResourceForm';
import sweetAlert from 'sweetalert';

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

class CreateResource extends React.Component {
  state = {
    resourceFolderURL: "",
    resources: [],
    chapter: {
      title: "",
      description: "",
      fileName: "",
      fielURL: "",
      assignment: {
        question: "",
        fileName: "",
        evaluationMatchValue: ""
      },
      quiz: [],
    }
  };

  handleChange = stateName => event => {
    event.preventDefault();
    if (event.target.id === "chapter_file" && event.target.files[0]) {
      let resourceName = event.target.files[0].name;
      let tempChapter = this.state.chapter
      tempChapter.fileName = resourceName
      this.setState({
        chapter: tempChapter
      });

      let storageRef = firebase.storage().refFromURL(this.state.resourceFolderURL);

      let file = event.target.files[0];
      let resourceRef = storageRef.child(resourceName);
      let uploadTask = resourceRef.put(file);

      uploadTask.on("state_changed", snapshot => {
        // code for progress
      }, err => {
        // error handling here
        // use err.code to handle specific errors
      }, () => {
        // code after upload completion
        resourceRef.getDownloadURL().then(url => {
          let temporaryChapter = this.state.chapter
          temporaryChapter[stateName] = url
          this.setState({
            chapter: temporaryChapter
          });
        });
      });
    } else {
      let value = event.target.value;
      let tempChapter = this.state.chapter
      tempChapter[stateName] = value
      this.setState({
        chapter: tempChapter
      });
    }
  };

  cancelUpload = () => {
    let scope = this
    var deleteRef = firebase.storage().refFromURL(this.state.resourceFolderURL)

    deleteRef.delete().then(function () {
      scope.props.setMainComp("course-list", "")
    }).catch(function (error) {
      sweetAlert({ title: "Error while deleting..", icon: "error" })
    });
  }

  setData = () => {
    let scope = this
    let tempResource = this.state.resources
    if (this.state.chapter.title !== "") {
      tempResource.push(this.state.chapter)
    }
    this.setState({
      resources: tempResource
    }, () => {
      fetch(`${config.APIHostName}:${config.APIHostingPort}/api/courses/${this.props.courseKey}`, {
        method: "put",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          sweetAlert({ title: "Resource added successfully.", icon: "success" })
          scope.props.setMainComp("course-list", "");
        })
        .catch(err => {
          sweetAlert({ title: "Resource failed to add.", icon: "error" })
        });
    })
  };

  addChapter = () => {
    if (this.state.chapter.title !== "") {
      let tempResource = this.state.resources
      tempResource.push(this.state.chapter)
      this.setState({
        resources: tempResource,
        chapter: {
          title: "",
          description: "",
          fileName: "",
          fielURL: "",
          assignment: {
            question: "",
            fileName: "",
            evaluationMatchValue: ""
          },
          quiz: [],
        }
      })
    }
  }

  saveQuiz = quizObject => {
    let tempQuiz = this.state.quiz
    tempQuiz.push(quizObject)
    console.log("save in createresourse",tempQuiz)
    this.setState({ quiz: tempQuiz })
  }

  componentDidMount() {
    let storageRef = firebase.storage().ref(`courses/resources/CRF${Date.now()}/`);
    storageRef.getDownloadURL().then(url => {
      this.setState({
        resourceFolderURL: url
      });
    });
  }

  render() {
    const { classes } = this.props;
    
    console.log("resource",this.state.resources)

    return (
      <React.Fragment>
        <div className={classes.container}>
          <ResourceForm
            handleChange={this.handleChange}
            chapter={this.state.chapter}
            saveQuiz={this.saveQuiz} />
          <div>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.addChapter.bind(this)}
            >
              <Add />
              Save &amp; Add Another Chapter
            </Button>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.cancelUpload.bind(this)}
              >
                Cancel
            <Delete />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.setData.bind(this)}
              >
                Submit
            <Send />
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CreateResource.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateResource);
