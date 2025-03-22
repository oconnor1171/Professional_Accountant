const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleFileUpload, getFileStatus } = require('../controllers/fileController');

const upload = multer({ dest: 'uploads/' });

// POST /api/files/upload
router.post('/upload', upload.single('file'), handleFileUpload);

// GET /api/files/status/:id
router.get('/status/:id', getFileStatus);

module.exports = router;
