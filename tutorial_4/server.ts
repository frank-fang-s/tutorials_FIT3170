import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*' }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// When a client connects
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Listen for a message from the client
    socket.on('client-message', (data) => {
        // Generate a formatted timestamp (e.g., "8:01:28 PM")
        const timestamp = new Date().toLocaleTimeString();

        console.log('Received from client:', data, ' TIMESTAMP: ', timestamp);

        // Broadcast the message AND the timestamp to ALL connected clients
        io.emit('server-message', {
            text: 'Server received: ' + data.text,
            time: timestamp
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

httpServer.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});