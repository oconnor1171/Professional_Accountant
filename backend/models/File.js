const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  status: { type: String, default: 'Processing' },
  analysis: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
