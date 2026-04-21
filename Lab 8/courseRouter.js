const express = require("express");
const router = express.Router();
const Course = require("../models/Course");


router.post("/", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE 
router.put("/:id", async (req, res) => {
  try {
    const result = await Course.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await Course.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;