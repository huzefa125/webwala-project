const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Add Task
exports.addTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { title } = req.body;
    const userId = req.user.userId;

    const task = new Task({
      title,
      user: userId,
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task added successfully',
      task,
    });
  } catch (error) {
    console.error('Add task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding task',
      error: error.message 
    });
  }
};

// Get All Tasks for logged-in user
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { filter } = req.query; // 'completed', 'pending', or undefined for all

    let query = { user: userId };

    if (filter === 'completed') {
      query.completed = true;
    } else if (filter === 'pending') {
      query.completed = false;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tasks',
      error: error.message 
    });
  }
};

// Update Task (mark complete and/or edit title)
exports.updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user.userId;

    // Find task and verify user ownership
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this task' 
      });
    }

    // Update task
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating task',
      error: error.message 
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find task and verify user ownership
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this task' 
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting task',
      error: error.message 
    });
  }
};
