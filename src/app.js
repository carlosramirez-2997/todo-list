require('dotenv').config();

const path = require('path');

const express = require('express');
const session = require('express-session');

const RedisStore = require('connect-redis').default;
const { redisClient, connectRedis } = require('./config/redis');
const connectMongoDB = require('./config/mongodb');

const loginRoutes = require('./routes/loginRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));


app.use(loginRoutes)
app.use('/api/tasks', taskRoutes);
app.use(errorHandler.get404);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        console.log('Connecting to MongoDB and Redis...');
        await Promise.all([connectMongoDB(), connectRedis()]);
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.log('❌ Failed to start server:', err);
        process.exit(1);
    }
}

startServer();