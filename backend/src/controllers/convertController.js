const fs = require('fs');
const path = require('path');
const generatePDF = require('../utils/pdfGenerator');

exports.convertImagesToPDF = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded. Use field name "images".' });
    }

    const imagePaths = req.files.map(f => f.path);
    const outputDir = path.join(__dirname, '..', '..', 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `converted-${Date.now()}.pdf`);
    await generatePDF(imagePaths, outputPath);

    // Remove temporary uploaded files
    for (const file of req.files) {
      try { fs.unlinkSync(file.path); } catch (_) {}
    }

    // Send back the PDF URL
    const relative = `/output/${path.basename(outputPath)}`;
    res.status(200).json({
      message: 'PDF created successfully',
      downloadUrl: relative
    });
  } catch (err) {
    next(err);
  }
};
