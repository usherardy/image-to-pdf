const express = require('express');
const cors = require('cors');
const path = require('path');
const convertRoutes = require('./routes/convertRoutes.js');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Serve generated PDFs statically
app.use('/output', express.static(path.join(__dirname, '..', 'output')));

// Health check route
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Conversion route
app.use('/api/convert', convertRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
