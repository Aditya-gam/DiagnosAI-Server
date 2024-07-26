import express from "express";
import { registerUser, loginUser } from "../services/authService.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser({ email, password, name });
    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );
      res.status(201).json({ user, token });
    } else {
      res.status(400).json({ message: "Registration failed." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering new user.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    if (user && token) {
      res.status(200).json({ message: "Logged in successfully", user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in.", error: error.message });
  }
});

export default router;
