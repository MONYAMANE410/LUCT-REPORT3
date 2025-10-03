const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Submit feedback
router.post('/', (req, res) => {
  const { reportId, prlId, comments } = req.body;

  const sql = 'INSERT INTO feedback (report_id, prl_id, comments) VALUES (?, ?, ?)';
  db.query(sql, [reportId, prlId, comments], (err, result) => {
    if (err) {
      console.error('Feedback insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Feedback submitted successfully' });
  });
});

// Get all reports with feedback
router.get('/reports', (req, res) => {
  const sql = `
    SELECT r.*, f.comments AS prl_feedback
    FROM reports r
    LEFT JOIN feedback f ON r.id = f.report_id
    ORDER BY r.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
