const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('Hello World!'));

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
