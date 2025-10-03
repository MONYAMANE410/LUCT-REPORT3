const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing failed' });

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ error: 'Registration failed' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Login failed' });
    if (results.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(401).json({ error: 'Invalid credentials' });

      // ✅ Send back full user info
      res.json({
        message: 'Login successful',
        name: user.name,
        role: user.role,
        email: user.email
      });
    });
  });
};
