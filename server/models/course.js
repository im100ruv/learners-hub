const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    key: String,
    title: String,
    subtitle: String,
    banner_image: String,
    categories: [ String ],
    syllabus: String,
    resourceFolderURL: String,
    resources: [{
      title: String,
      description: String,
      fileName: String,
      fileURL: String,
      assignment: {
        question: String,
        fileName: String,
        evaluationMatchValue: String
      },
      quiz: [{
        objective: Boolean,
        question: String,
        options: [String],
        answer: String
      }]
    }],
    level: String,
    summary: String,
    new_release: Boolean,
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