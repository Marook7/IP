const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  instructor: { type: String},
  price: {  type: Number },
  category: { type: String},
  enrolledStudents: { type: Number},
});

module.exports = mongoose.model("Course", courseSchema);