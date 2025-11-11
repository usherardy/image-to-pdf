module.exports = (err, _req, res, _next) => {
  console.error('[Error]', err.message);
  if (err.message && err.message.includes('Only image files')) {
    return res.status(400).json({ error: 'Only image files are allowed.' });
  }
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};
