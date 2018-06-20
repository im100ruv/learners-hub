const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    key: String,
    homepage: String,
    title: String,
    subtitle: String,
    banner_image: String,
    categories: [ String ],
    syllabus: String,
    resources: [String],
    level: String,
    summary: String,
    new_release: Boolean,
    full_course_available: Boolean,
    expected_duration_unit: String,
    expected_duration: Number,
    required_knowledge: String,
    instructors: [ {
      bio: String,
      name: String,
      image: String
    } ],
    faq: [ {
      question: String,
      answer: String
    } ],
    expected_learning: String
});

module.exports = mongoose.model('course', schema);