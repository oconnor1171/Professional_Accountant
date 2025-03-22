const express = require('express');
const multer = require('multer');
const File = require('../models/File'); // MongoDB Schema
const { analyzeFileWithGPT } = require('../utils/gptHelper');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    const newFile = new File({
        filename: req.file.originalname,
        status: 'Processing',
        analysis: '',
    });

    const savedFile = await newFile.save();

    // Process file with GPT
    analyzeFileWithGPT(savedFile._id, req.file);

    res.json({ message: 'File uploaded!', fileId: savedFile._id });
});

// Fetch file status
router.get('/status/:fileId', async (req, res) => {
    const file = await File.findById(req.params.fileId);
    res.json(file);
});

module.exports = router;
