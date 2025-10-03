const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Get classes for logged-in lecturer
router.get('/classes', (req, res) => {
  const email = req.query.email;
  const sql = 'SELECT * FROM classes WHERE lecturer_email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Submit new class
router.post('/classes', (req, res) => {
  const { course_id, class_name, venue, scheduled_time, lecturer_email } = req.body;
  const sql = `
    INSERT INTO classes (course_id, class_name, venue, scheduled_time, lecturer_email)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [course_id, class_name, venue, scheduled_time, lecturer_email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Class added successfully' });
  });
});

// ✅ Monitoring tab
router.get('/monitoring', (req, res) => {
  const email = req.query.email;
  const sql = 'SELECT * FROM monitoring WHERE lecturer_email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Submit monitoring data
router.post('/monitoring', (req, res) => {
  const { course_name, attendance_rate, engagement_score, lecturer_email } = req.body;
  const sql = `
    INSERT INTO monitoring (course_name, attendance_rate, engagement_score, lecturer_email)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [course_name, attendance_rate, engagement_score, lecturer_email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Monitoring data saved successfully' });
  });
});

// ✅ Ratings tab
router.get('/ratings', (req, res) => {
  const email = req.query.email;
  const sql = 'SELECT * FROM ratings WHERE lecturer_email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// ✅ Submit rating data
router.post('/ratings', (req, res) => {
  const { course_name, rating, comments, lecturer_email } = req.body;
  const sql = `
    INSERT INTO ratings (course_name, rating, comments, lecturer_email)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [course_name, rating, comments, lecturer_email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Rating submitted successfully' });
  });
});


module.exports = router;
