import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get current user
router.get('/me', authenticateToken, getCurrentUser);

// Logout user
router.post('/logout', logoutUser);

export default router;
