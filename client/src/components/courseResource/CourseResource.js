import React from 'react';
import './CourseResource.css'
import CircularProgress from '../materialUIComponents/CircularProgress';
import BannerCard from '../courseDetail/BannerCard';

export default class CourseDetail extends React.Component {
  state = {
    key: undefined,
    homepage: undefined,
    title: undefined,
    subtitle: undefined,
    banner_image: undefined,
    new_release: undefined,
    syllabus: undefined,
    resources: undefined,
  }

  fetchJsonData = async (query) => {
    const api_call = await fetch(`http://localhost:8000${query}`)
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
            Course Materials
          </div>
          <div className="resource-list">
            1. <a href="#intro" target="blank">Introduction</a>
          </div>
        </div>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}