// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Ensure you have a JWT_SECRET in your .env for production

const registerUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.createUser({ email, password: hashedPassword });
};

const loginUser = async ({ email, password }) => {
  const user = await User.getUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    // Create a token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      { expiresIn: '24h' } // Token expires in 24 hours
    );
    return { user, token }; // Return both user and token
  }
  return null;
};

module.exports = {
  registerUser,
  loginUser
};
