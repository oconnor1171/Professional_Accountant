import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = () => {
        axios.post('/api/chatbot/chat', { message })
            .then(res => setResponse(res.data.response))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Chat with GPT</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <p>Response: {response}</p>
        </div>
    );
};

export default Chatbot;
