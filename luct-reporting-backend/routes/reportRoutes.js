const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const {
    faculty,
    className,
    week,
    dateOfLecture,
    courseName,
    courseCode,
    lecturerName,
    actualStudents,
    totalStudents,
    venue,
    scheduledTime,
    topic,
    outcomes,
    recommendations
  } = req.body;

  const sql = `
    INSERT INTO reports (
      faculty, class_name, week, date_of_lecture,
      course_name, course_code, lecturer_name,
      actual_students_present, total_registered_students,
      venue, scheduled_time, topic_taught,
      learning_outcomes, recommendations
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    faculty, className, week, dateOfLecture,
    courseName, courseCode, lecturerName,
    actualStudents, totalStudents,
    venue, scheduledTime, topic,
    outcomes, recommendations
  ], (err, result) => {
    if (err) {
      console.error('Report insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Report saved successfully' });
  });
});

module.exports = router;
