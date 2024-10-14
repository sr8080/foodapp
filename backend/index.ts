import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io'; 
import userRoutes from './routes/userroute'; 
import connectDB from './config/Db';
import adminroute from './routes/adminroute';
import restaurantroute from './routes/restaurantroute';

dotenv.config();

const app = express();

// Create an HTTP server by wrapping the Express app
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // You can restrict this to specific domains if necessary
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Use the user routes
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminroute);
    app.use('/api/restaurant', restaurantroute);

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    // Handle Socket.io connections
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Listen for custom events, e.g., "message"
      socket.on('message', (messageData) => {
        console.log('Message received:', messageData);

        // You can broadcast the message to other users, for example
        io.emit('message', messageData); // Broadcast the message to all connected clients
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
