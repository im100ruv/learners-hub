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
          homepage: course.homepage,
          title: course.title,
          subtitle: course.subtitle,
          banner_image: course.banner_image,
          new_release: course.new_release,
          syllabus: course.syllabus,
          resources: [{
            title: "Introduction",
            description: "Java is a programming Language Java is a programming Language Java is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming LanguageJava is a programming Language....",
            fileName: "",
            fileURL: "",
            assignment: {
              question: "",
              fileName: "",
              evaluationMatchValue: ""
            },
            quiz: [{
              objective: true,
              question: "Java is a ..",
              options: ["computer", "programming language", "nothing", "joke"],
              answer: "programming language"
            }]
          }, {
            title: "Installation",
            description: "Installation procedure Installation procedure Installation procedure Installation procedureInstallation procedureInstallation procedureInstallation procedureInstallation procedureInstallation procedure....",
            fileName: "UdacityCourseCatalogAPIDocumentation-v0.pdf",
            fileURL: "https://firebasestorage.googleapis.com/v0/b/learnershub-mountblue.appspot.com/o/courses%2Fresources%2FCRF1530247671754%2FUdacityCourseCatalogAPIDocumentation-v0.pdf?alt=media&token=fa1e22c2-62cc-402b-b091-d7a3b9587cb3",
            assignment: {
              question: "",
              fileName: "",
              evaluationMatchValue: ""
            },
            quiz: [{
              objective: true,
              question: "Do you have java installed?",
              options: ["yes", "no"],
              answer: "yes"
            },{
              objective: true,
              question: "Do you have all softwares installed?",
              options: ["yes", "no"],
              answer: "yes"
            }]
          }, {
            title: "Final Summary",
            description: "This is summary paragraph This is summary paragraph This is summary paragraph This is summary paragraph This is summary paragraphThis is summary paragraphThis is summary paragraphThis is summary paragraphThis is summary paragraphThis is summary paragraphThis is summary paragraph....",
            fileName: "",
            fileURL: "",
            assignment: {
              question: "",
              fileName: "",
              evaluationMatchValue: ""
            },
            quiz: [{
              objective: true,
              question: "Was the lesson useful?",
              options: ["nice", "not good"],
              answer: "nice"
            }]
          }],
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