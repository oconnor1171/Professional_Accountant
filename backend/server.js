const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const fileRoutes = require('./routes/fileRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config(); // Load env variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/files', fileRoutes);
app.use('/api/chatbot', chatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
// const fileRoutes = require('./routes/fileRoutes');
// const chatRoutes = require('./routes/chatRoutes');

// app.use('/api/files', fileRoutes);
// app.use('/api/chatbot', chatRoutes);