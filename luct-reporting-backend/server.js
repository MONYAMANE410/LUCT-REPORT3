const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Route Imports
const authRoutes      = require('./routes/authRoutes');
const reportRoutes    = require('./routes/reportRoutes');
const feedbackRoutes  = require('./routes/feedbackRoutes');
const lecturerRoutes  = require('./routes/lecturerRoutes');
const principalRoutes = require('./routes/principalRoutes');
const testRoute       = require('./routes/testRoute'); // Optional
const plRoutes = require('./routes/plRoutes');
const studentRoutes = require('./routes/studentRoutes');

// ✅ Route Usage
app.use('/api/auth',      authRoutes);
app.use('/api/reports',   reportRoutes);
app.use('/api/feedback',  feedbackRoutes);
app.use('/api/lecturer',  lecturerRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api',           testRoute); // Optional fallback/test route
app.use('/api/pl', plRoutes);
app.use('/api/student', studentRoutes);

// ✅ Root Endpoint
app.get('/', (req, res) => {
  res.send('🎓 LUCT Reporting API is running');
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
