// backend/server.js
import express from 'express';
import cors from 'cors';
import router from './routes/referral.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/referral', router);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
