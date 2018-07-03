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
    key: this.props.courseKey,
    resourceFolderURL: "",
    resources: [{
      title: "",
      // description: "Java is a programming Language Java is a programming Language Java is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming Language....",
      fileName: "",
      // fileURL: "",
      // assignment: {
      //   question: "",
      //   fileName: "",
      //   evaluationMatchValue: ""
      // },
      // quiz: [{
      //   objective: true,
      //   question: "Java is a ..",
      //   options: ["computer", "programming language", "nothing", "joke"],
      //   answer: "programming language"
      // }]
    }],
    chapter: {
      title: "",
      fileName: "",
    }
  };

  handleChange = stateName => event => {
    event.preventDefault();
    if (event.target.id === "chapter_file" && event.target.files[0]) {
      let resourceName = event.target.files[0].name;
      this.setState({
        chapter: {
          fileName: resourceName
        }
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
          this.setState({
            chapter: {
              [stateName]: url
            }
          });
        });
      });
    } else if (event.target.name === "quiz_question") {
      let value = event.target.value.trim();
      this.setState({
        chapter: {
          [stateName]: value
        }
      });
    } else {
      let value = event.target.value.trim();
      this.setState({
        chapter: {
          quiz: [{
            [stateName]: value
          }],
        }
      });
    }
  };

  cancelUpload = () => {
    let scope = this
    var deleteRef = firebase.storage().refFromURL(this.state.resourceFolderURL)

    deleteRef.delete().then(function () {
      scope.props.setMainComp("course-list", "")
    }).catch(function (error) {
      console.log("error while deleting course resources..", error)
    });
  }

  setData = () => {
    // let scope = this;
    // firebase
    //   .storage()
    //   .ref("courses/banners/")
    //   .child("default.jpg")
    //   .getDownloadURL()
    //   .then(url => {
    //     let bannerURL = this.state.banner_image;
    //     if (this.state.banner_image === "") {
    //       bannerURL = url;
    //     }
    //     this.setState(
    //       {
    //         key: `CK${Date.now()}`,
    //         banner_image: bannerURL,
    //         categories: this.state.categories.split(",").map(category => {
    //           return category.trim();
    //         })
    //       },
    //       () => {
    //         fetch(
    //           `${config.APIHostName}:${config.APIHostingPort}/api/courses`,
    //           {
    //             method: "post",
    //             body: JSON.stringify(this.state),
    //             headers: {
    //               "Content-Type": "application/json"
    //             }
    //           }
    //         )
    //           .then(function (response) {
    //             alert("Course uploaded successfully.");
    //             scope.props.setMainComp("create-resource", "");
    //           })
    //           .catch(err => {
    //             alert("Course not uploaded");
    //           });
    //       }
    //     );
    //   });
  };

  addChapter = () => {
    //add the form agian
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

    console.log(this.state.resources)

    return (
      <React.Fragment>
        <div className={classes.container}>
          <ResourceForm handleChange={this.handleChange} fileName={this.state.resources.fileName} />
          <div>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.addChapter}
            >
              <Add />
              Save &amp; Add Another Chapter
            </Button>
            <div>
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
