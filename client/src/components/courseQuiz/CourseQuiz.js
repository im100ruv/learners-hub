import React from 'react';
import './CourseQuiz.css';
import CircularProgress from '../materialUIComponents/CircularProgress';
import config from '../../config/config.json';
import BannerCard from '../courseDetail/BannerCard';
import Button from '../materialUIComponents/Button';

export default class CourseQuiz extends React.Component {
  state = {
    key: undefined,
    resources: []
  }

  fetchJsonData = async (query) => {
    const api_call = await fetch(`${config.APIHostName}:${config.APIHostingPort}${query}`)
    return await api_call.json()
  }

  componentDidMount() {
    this.fetchJsonData(`/api/courses/${this.props.courseKey}`)
      .then(course => {
        this.setState({
          key: course.key,
          homepage: course.homepage,
          title: course.title,
          subtitle: course.subtitle,
          banner_image: course.banner_image,
          new_release: course.new_release,
          syllabus: course.syllabus,
          resources: course.resources,
        })
      });
  }

  render() {
    return this.state.key ? (
      <React.Fragment>
        <BannerCard
          title={this.state.title}
          subtitle={this.state.subtitle}
          new_release={this.state.new_release}
        />
        <div className="course-body">
          <div className="section-title">
            Course Quiz and/or Assignment
          </div>
          <div className="resource-list">
            Quiz goes here...
          </div>
        </div>
        <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Submit" destination="certificate" /></center>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}