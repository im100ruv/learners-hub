import React from 'react';
import './CourseDetail.css'
import CircularProgress from '../materialUIComponents/CircularProgress';
import BannerCard from './BannerCard';
import Avatar from '../materialUIComponents/Avatar'
import Button from '../materialUIComponents/Button'
import config from '../../config/config.json';

export default class CourseDetail extends React.Component {
  state = {
    key: undefined,
    faq: []
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
          title: course.title,
          subtitle: course.subtitle,
          banner_image: course.banner_image,
          categories: course.categories,
          summary: course.summary,
          instructors: course.instructors,
          expected_learning: course.expected_learning,
          required_knowledge: course.required_knowledge,
          new_release: course.new_release,
          level: course.level,
          expected_duration: course.expected_duration,
          syllabus: course.syllabus,
          faq: course.faq
        })
      });
  }

  render() {
    let faqs;
    if (this.state.faq.length > 0) {
      faqs = this.state.faq.map((obj, i) => {
        return (
          <div key={i}>
            <p><b>{obj.question}</b></p>
            <p>{obj.answer}</p>
            <hr />
          </div>
        )
      })
    }
    return this.state.key ? (
      <React.Fragment>
        <BannerCard
          title={this.state.title}
          subtitle={this.state.subtitle}
          new_release={this.state.new_release}
        />
        <div className="course-body">
          <div className="about-course">
            <b> About this course: </b>{this.state.summary}
          </div>
          <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Start Course" destination="course-resource" /></center>
          <div className="instructor-detail">
            <div><Avatar image={this.state.instructors[0].image}/></div>
            <div>
              <b>Taught by: </b> {this.state.instructors[0].name}
              <p className="instructor-bio">{this.state.instructors[0].bio}</p>
            </div>
          </div>
          <div className="info-table">
            <div><b>Level</b></div>
            <div>{this.state.level}</div>

            <div><b>Categories</b></div>
            <div>{this.state.categories.join(", ")}</div>

            <div><b>Expected Duration</b></div>
            <div>{this.state.expected_duration} months</div>

            <div><b>Required Knowledge</b></div>
            <div>{this.state.required_knowledge}</div>

            <div><b>Expected Learning</b></div>
            <div>{this.state.expected_learning}</div>
          </div>
          <div className="section-title">
            Syllabus
          </div>
          <div className="section-syllabus">
            {this.state.syllabus}
          </div>
          <div className="section-title">
            FAQs
          </div>
          <div className="section-faq">
            {faqs}
          </div>
          <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Start Course" destination="course-resource" /></center>
        </div>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}