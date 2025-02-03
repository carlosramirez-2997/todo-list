const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  completed: { 
    type: Boolean, default: false 
  },
  start: { 
    type: Date, 
    default: Date.now 
  },
  end: { 
    type: Date, 
    default: Date.now 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', taskSchema);