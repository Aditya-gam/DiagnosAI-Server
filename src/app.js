const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const authRoutes = require('./routes/authRoutes');

// Middleware
const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('Hello World!'));

// Routes
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
