import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secretKey = process.env.JWT_SECRET || "your-secret-key"; // Ensure you have a JWT_SECRET in your .env for production

const registerUser = async ({ email, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    email,
    password: hashedPassword,
    name,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  };
  return User.createUser(userData);
};

const loginUser = async ({ email, password }) => {
  const user = await User.getUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create a token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      { expiresIn: "24h" } // Token expires in 24 hours
    );
    await User.updateLastLogin(email);
    return { user, token }; // Return both user and token
  }
  return null;
};

export { registerUser, loginUser };
