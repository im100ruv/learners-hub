import React from 'react';
import './CourseResource.css';
import CircularProgress from '../materialUIComponents/CircularProgress';
import config from '../../config/config.json';
import BannerCard from '../courseDetail/BannerCard';
import Button from '../materialUIComponents/Button';

export default class CourseDetail extends React.Component {
  state = {
    key: undefined,
    resources: []
  }

  fetchJsonData = async (query) => {
    const api_call = await fetch(`${config.APIHostName}:${config.APIHostingPort}${query}`)
    return await api_call.json()
  }

  sampleFunction = (x, y) => {

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

    // here make resources component and show one by one with next and prev button
    // at last show certificate

    let resourceList = this.state.resources.map((item, index) => {
      return (
        <div key={index} className="chapter-container">
          {index + 1}.<a href={item.URL} target="blank">{item.name}</a>
          <div className="object-container">
            <object data={item.URL} type="" width="100%" height="100%">
              This browser does not support the above file-type. Please download the file to view it: <a href={item.URL}>Download PDF</a>
            </object>
          </div>
        </div>
      )
    })
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
            {resourceList}
          </div>
        </div>
        <center><Button setMainComp={this.sampleFunction} courseKey={this.state.key} buttonValue="Quiz/Assignments" destination="course-quiz" /></center>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}