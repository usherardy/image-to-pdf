const express = require('express');
const multer = require('multer');
const path = require('path');
const convertController = require('../controllers/convertController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }
});

router.post('/', upload.array('images', 10), convertController.convertImagesToPDF);

module.exports = router;
