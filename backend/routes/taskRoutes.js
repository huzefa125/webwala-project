const express = require('express');
const { body, validationResult, param } = require('express-validator');
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware to format errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      formattedErrors[error.param] = error.msg;
    });
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
  next();
};

// All task routes require authentication
router.use(authMiddleware);

// Add task
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty().withMessage('Task title is required')
      .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1-200 characters'),
  ],
  handleValidationErrors,
  addTask
);

// Get all tasks
router.get('/', getAllTasks);

// Update task
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty().withMessage('Title cannot be empty')
      .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1-200 characters'),
    body('completed')
      .optional()
      .isBoolean().withMessage('Completed must be true or false'),
  ],
  handleValidationErrors,
  updateTask
);

// Delete task
router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
  ],
  handleValidationErrors,
  deleteTask
);

module.exports = router;
