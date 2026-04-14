const express = require('express');
const { body } = require('express-validator');
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// Add task
router.post(
  '/',
  [body('title', 'Task title is required').notEmpty().trim()],
  addTask
);

// Get all tasks
router.get('/', getAllTasks);

// Update task
router.put(
  '/:id',
  [
    body('title', 'Task title cannot be empty').optional().notEmpty().trim(),
    body('completed', 'Completed must be a boolean').optional().isBoolean(),
  ],
  updateTask
);

// Delete task
router.delete('/:id', deleteTask);

module.exports = router;
