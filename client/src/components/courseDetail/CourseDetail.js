import React from 'react';
import CircularProgress from '../CircularProgress';

export default class CourseDetail extends React.Component {
  state = {
    key: undefined,
    homepage: undefined,
    title: undefined,
    subtitle: undefined,
    banner_image: undefined,
    categories: undefined,
    summary: undefined,
    instructors: undefined,
    expected_learning: undefined,
    required_knowledge: undefined,
    new_release: undefined,
    full_course_available: undefined,
    level: undefined,
    expected_duration_unit: undefined,
    expected_duration: undefined,
    syllabus: undefined,
    resources: undefined,
    faq: undefined
  }

  fetchJsonData = async (query) => {
    const api_call = await fetch(`http://localhost:8000${query}`)
    return await api_call.json()
  }

  componentDidMount() {
    this.fetchJsonData(`/api/courses/${this.props.courseKey}`)
      .then(course => {
        console.log(course)
        this.setState({
          key: course.key,
          homepage: course.homepage,
          title: course.title,
          subtitle: course.subtitle,
          banner_image: course.banner_image,
          categories: course.categories,
          summary: course.summary,
          instructors: course.instructors,
          expected_learning: course.expected_learning,
          required_knowledge: course.required_knowledge,
          new_release: course.new_release,
          full_course_available: course.full_course_available,
          level: course.level,
          expected_duration_unit: course.expected_duration_unit,
          expected_duration: course.expected_duration,
          syllabus: course.syllabus,
          resources: course.resources,
          faq: course.faq
        })
      });
  }

  render() {
    // let years
    // if (this.state.years) {
    //   years = ["hi"]
    // } else {
    //   years = <CircularProgress />
    // }
    return this.state.key ? (
      <React.Fragment>
        {"this.state"}
      </React.Fragment>
    ) : (<CircularProgress />)
  }
}