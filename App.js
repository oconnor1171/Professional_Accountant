import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Dashboard</Link> | 
                <Link to="/upload">Upload</Link> | 
                <Link to="/chatbot">Chat</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
        </Router>
    );
}

export default App;
