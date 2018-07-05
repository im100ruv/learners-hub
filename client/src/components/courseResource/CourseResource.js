import React from 'react';
import './CourseResource.css';
import CircularProgress from '../materialUIComponents/CircularProgress';
import config from '../../config/config.json';
import BannerCard from '../courseDetail/BannerCard';
import Button from '../materialUIComponents/Button';
import Chapter from './Chapter';
import Certificate from './Certificate';

export default class CourseResource extends React.Component {
  state = {
    index: 0,
    answeredCorrect: false,
    key: undefined,
    resources: []
  }

  fetchJsonData = async (query) => {
    const api_call = await fetch(`${config.APIHostName}:${config.APIHostingPort}${query}`)
    return await api_call.json()
  }

  sampleFunction = (direction, dummy) => {
    if (direction === "next") {
      this.setState({ index: this.state.index + 1, answeredCorrect: false })
    } else if (direction === "prev") {
      this.setState({ index: this.state.index - 1 })
    }
  }

  setAnsweredCorrect = () => {
    this.setState({ answeredCorrect: true })
  }

  componentDidMount() {
    this.fetchJsonData(`/api/courses/${this.props.courseKey}`)
      .then(course => {
        this.setState({
          key: course.key,
          title: course.title,
          subtitle: course.subtitle,
          banner_image: course.banner_image,
          new_release: course.new_release,
          resources: course.resources,
        })
      });
  }

  render() {
    console.log(this.state.resources)
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
            {this.state.index < this.state.resources.length ? (
              <Chapter
                resource={this.state.resources[this.state.index]}
                index={this.state.index}
                setMainComp={this.sampleFunction}
                courseKey={this.state.key}
                setAnsweredCorrect={this.setAnsweredCorrect}
              />
            ) : (
                <Certificate />
              )}
          </div>
          {this.state.index < this.state.resources.length ? (
            <div>
              <Button disabled={!this.state.answeredCorrect} setMainComp={this.sampleFunction} courseKey={this.state.key} buttonValue="Next" destination="next" />
              {this.state.index === 0 ? "" : (
                <Button setMainComp={this.sampleFunction} courseKey={this.state.key} buttonValue="Previous" destination="prev" />
              )}
            </div>
          ) : ""}
        </div>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}