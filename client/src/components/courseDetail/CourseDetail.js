import React, { Component } from 'react';
import './CourseDetail.css'
import CircularProgress from '../materialUIComponents/CircularProgress';
import BannerCard from './BannerCard';
import Avatar from '../materialUIComponents/Avatar'
import Button from '../materialUIComponents/Button'
import config from '../../config/config.json';

import { connect } from 'react-redux'
import loggedUserAction from '../../store/actions/loggedUser';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: undefined,
      faq: [],
      loggedUser: null
    };
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


  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.loggedUser.user_type) {
      this.setState({
          loggedUser: nextProps.loggedUser
      });
    }
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

    console.log(this.state, 'props', this.props);

    // let userActionbutton = this.renderUserActionbutton.bind(this);

    return this.state.key ? (
      <React.Fragment>
        <BannerCard
          title={this.state.title}
          subtitle={this.state.subtitle}
          new_release={this.state.new_release}
        />
        { (this.props.loggedUser.user_type === 'Author')
          ?  <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Update Course" destination="update-course" /></center>
          : null
        }
        <div className="course-body">
          <div className="about-course">
            <b> About this course: </b>{this.state.summary}
          </div>
          { (this.props.loggedUser.user_type === 'Learner')
            ?  <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Start Course" destination="course-resource" /></center>
            : null
          }
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
          { (this.props.loggedUser.user_type === 'Learner')
            ?  <center><Button setMainComp={this.props.setMainComp} courseKey={this.state.key} buttonValue="Start Course" destination="course-resource" /></center>
            : null
          }
          </div>
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}

export default connect((state) => ({
  loggedUser: state.loggedUser
}), loggedUserAction)(CourseDetail);