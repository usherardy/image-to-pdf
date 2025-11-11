const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(imagePaths, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ autoFirstPage: false });
    const out = fs.createWriteStream(outputPath);

    doc.on('error', reject);
    out.on('error', reject);
    out.on('finish', () => resolve(outputPath));

    doc.pipe(out);

    try {
      imagePaths.forEach(p => {
        const img = doc.openImage(p);
        doc.addPage({ size: [img.width, img.height] });
        doc.image(img, 0, 0);
      });
      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = generatePDF;
