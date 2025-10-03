const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all teaching reports
router.get('/reports', (req, res) => {
  const sql = `
    SELECT 
      id,
      lecturer_id,
      class_id,
      week,
      date_of_lecture,
      actual_students_present,
      total_registered_students,
      topic_taught,
      learning_outcomes,
      recommendations,
      faculty,
      class_name,
      course_name,
      course_code,
      lecturer_name,
      venue,
      scheduled_time
    FROM reports
    ORDER BY date_of_lecture DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all courses
router.get('/courses', (req, res) => {
  const sql = 'SELECT id, name, code, faculty, assigned_to FROM courses ORDER BY code ASC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all monitoring data
router.get('/monitoring', (req, res) => {
  const sql = 'SELECT * FROM monitoring ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all ratings
router.get('/ratings', (req, res) => {
  const sql = 'SELECT * FROM ratings ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all classes
router.get('/classes', (req, res) => {
  const sql = 'SELECT * FROM classes ORDER BY scheduled_time ASC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// Submit feedback for a report
router.post('/feedback', (req, res) => {
  const { report_id, comments, prl_id } = req.body;
  const sql = 'INSERT INTO feedback (report_id, comments, prl_id) VALUES (?, ?, ?)';
  db.query(sql, [report_id, comments, prl_id], (err, result) => {
    if (err) {
      console.error('Error in POST /feedback:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Feedback submitted successfully' });
  });
});

// Get feedback for all reports
router.get('/feedback', (req, res) => {
  const sql = 'SELECT * FROM feedback ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error in GET /feedback:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


module.exports = router;
