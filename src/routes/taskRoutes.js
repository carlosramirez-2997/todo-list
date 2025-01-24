const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getTasks);

router.post('/', [
    body('title').isLength({ min: 1, max: 20 }).withMessage('Title is required'),
    body('completed').isBoolean(),
    body('createdAt').optional().isISO8601().withMessage('Invalid date format. Use ISO 8601.'),
], taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;