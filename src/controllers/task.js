const { validationResult } = require('express-validator');

const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.session.user._id });

  const events = tasks.map(task => ({
    title: task.title,
    start: task.start,
    end: task.end
  }));

  res.render('./task/index', {
    pageTitle: 'Home',
    path: '/index',
    events: JSON.stringify(events)
  });
};

exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
};