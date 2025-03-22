import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('/api/files/status')
            .then(response => setFiles(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>File Upload Status</h2>
            {files.map(file => (
                <Card key={file._id} style={{ margin: '10px', padding: '10px' }}>
                    <CardContent>
                        <Typography variant="h6">{file.filename}</Typography>
                        <Typography>Status: {file.status}</Typography>
                        {file.status === 'Completed' ? <Typography>Analysis: {file.analysis}</Typography> : <CircularProgress />}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Dashboard;
