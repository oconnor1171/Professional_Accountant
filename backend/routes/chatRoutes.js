const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  // Placeholder GPT reply
  res.json({ response: `Echo: ${message}` });
});

module.exports = router;
