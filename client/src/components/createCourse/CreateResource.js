import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Send from "@material-ui/icons/Send";
import Delete from "@material-ui/icons/Delete";
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
  };

  handleChange = stateName => event => {
    event.preventDefault();
    let value = event.target.value.trim();
    this.setState({
      [stateName]: value
    });
  };

  cancelUpload = () => {
    // let scope = this
    // if (this.state.banner_image) {
    //   var deleteRef = firebase.storage().refFromURL(this.state.banner_image)

    //   deleteRef.delete().then(function () {
    //     // File deleted successfully
    //     scope.props.setMainComp("course-list", "")
    //   }).catch(function (error) {
    //     console.log("error while deleting banner image..", error)
    //   });
    // }
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

  render() {
    const { classes } = this.props;
    console.log(this.state.resources)
    return (
      <React.Fragment>
        <ResourceForm handleChange={this.handleChange} fileName={this.state.resources.fileName}/>
        <br />
        <p className="label-button" onClick={this.addChapter}>Add Another Chapter</p>
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
      </React.Fragment>
    );
  }
}

CreateResource.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateResource);
