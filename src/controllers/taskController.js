const { validationResult } = require('express-validator');

const Task = require('../models/Task');

// Get all tasks0
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
};

// Update a task
exports.updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

// Delete a task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
};