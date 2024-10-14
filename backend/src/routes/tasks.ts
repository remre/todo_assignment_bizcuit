import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { ensureGeneralGroupExists } from '../middleware/ensureGeneralGroupExists';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getGroups,
  createGroup,
} from '../controllers/taskControllers';

const router = express.Router();

// Group Routes

// Get all groups for the logged-in user
router.get('/groups', authenticateToken, getGroups);

// Create a new group
router.post('/groups', authenticateToken, createGroup);

// Task Routes

// Create a new task
router.post('/', authenticateToken, ensureGeneralGroupExists, createTask);

// Get all tasks for the logged-in user
router.get('/', authenticateToken, getAllTasks);

// Update a task
router.put('/:id', authenticateToken, ensureGeneralGroupExists, updateTask);

// Delete a task
router.delete('/:id', authenticateToken, deleteTask);

export default router;
