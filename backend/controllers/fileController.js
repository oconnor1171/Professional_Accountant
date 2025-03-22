const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// You’ll create this model shortly
const File = require('../models/File');

// Handle file upload
exports.handleFileUpload = async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      filepath: req.file.path,
      status: 'Processing',
      uploadedAt: new Date()
    });

    await newFile.save();

    // Simulate GPT processing
    setTimeout(async () => {
      newFile.status = 'Completed';
      newFile.analysis = `This is a dummy analysis of ${newFile.filename}`;
      await newFile.save();
    }, 2000);

    res.json({ message: 'File uploaded successfully', fileId: newFile._id });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

// Get file status
exports.getFileStatus = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching file status' });
  }
};
