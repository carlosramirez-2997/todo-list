require('dotenv').config();
const log = require("log");

const express = require('express');
const connectDB = require('./config/mongodb');

const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

connectDB();
const app = express();

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler.get404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log.info(`Server running on http://localhost:${PORT}`));