const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Courses
router.get('/courses', (req, res) => {
  db.query('SELECT * FROM courses ORDER BY code ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/courses', (req, res) => {
  const { name, code, faculty } = req.body;
  db.query('INSERT INTO courses (name, code, faculty) VALUES (?, ?, ?)', [name, code, faculty], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

router.put('/courses/assign', (req, res) => {
  const { course_id, assigned_to } = req.body;
  db.query('UPDATE courses SET assigned_to = ? WHERE id = ?', [assigned_to, course_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Lecturers
router.get('/lecturers', (req, res) => {
  db.query('SELECT id, name, email FROM users WHERE role = "lecturer"', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Reports
router.get('/reports', (req, res) => {
  db.query('SELECT * FROM reports ORDER BY date_of_lecture DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Monitoring
router.get('/monitoring', (req, res) => {
  db.query('SELECT * FROM monitoring ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Classes
router.get('/classes', (req, res) => {
  db.query('SELECT * FROM classes ORDER BY scheduled_time ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ratings
router.get('/ratings', (req, res) => {
  db.query('SELECT * FROM ratings ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
