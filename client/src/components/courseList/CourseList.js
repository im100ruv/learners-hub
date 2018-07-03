import React, { Component } from "react";
import Snackbar from "@material-ui/core/SnackbarContent";
import Course from "./Course";
import "./Course.css";
import CircularProgress from "../materialUIComponents/CircularProgress";
import config from "../../config/config.json";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array_course: []
    };
  }

  heading_style = {
    justifyContent: "center",
    width: "42vw",
    color: "#e2e1effa",
    fontSize: "2.3vw",
    fontWeight: "bold",
    margin: "auto",
    backgroundColor: "#1A237E",
    borderRadius: "6px",
    boxShadow: "2px 3px 4px 1px #a9a6a6"
  };

  content_style = {
    width: "70%",
    margin: "45px auto 0px auto"
  };

  componentDidMount() {
    fetch(`${config.APIHostName}:${config.APIHostingPort}/api/courses`)
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({
          array_course: result
        });
      });
  }

  render() {
    let scope = this;
    return this.state.array_course.length > 0 ? (
      <div style={this.content_style}>
        <Snackbar
          style={this.heading_style}
          message={"Courses Delivered By LearnersHub"}
        />
        <br />
        <Course
          elements={scope.state.array_course}
          setMainComp={this.props.setMainComp}
        />
      </div>
    ) : (
      <CircularProgress />
    );
  }
}
export default CourseList;
