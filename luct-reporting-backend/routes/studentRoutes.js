const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get monitoring for logged-in student
router.get('/monitoring/:email', (req, res) => {
  const email = req.params.email;
  const sql = 'SELECT * FROM monitoring WHERE student_email = ? ORDER BY id DESC';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Submit rating
router.post('/ratings', (req, res) => {
  const { lecturer_email, course_name, rating, comments, student_email } = req.body;
  const sql = 'INSERT INTO ratings (lecturer_email, course_name, rating, comments, student_email) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [lecturer_email, course_name, rating, comments, student_email], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Rating submitted' });
  });
});

module.exports = router;
