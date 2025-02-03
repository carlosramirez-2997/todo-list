require('dotenv').config();

const path = require('path');

const express = require('express');
const session = require('express-session');

const RedisStore = require('connect-redis').default;
const { redisClient, connectRedis } = require('./config/redis');
const connectMongoDB = require('./config/mongodb');

const loginRoutes = require('./routes/login');
const taskRoutes = require('./routes/task');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000, // Session expires after 30 minutes (in milliseconds)
        secure: false, // Set to true if using HTTPS
        httpOnly: true
    }
}));


app.use(loginRoutes)
app.use('/tasks', taskRoutes);
app.use(errorHandler.get404);


app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    redisClient.get(`sess:${req.sessionID}`, async (err, sessionData) => {
        if (err) {
            return next(err);
        }
        if (!sessionData) {
            req.session.destroy(err => {
                if (err) {
                    return next(err);
                }
                res.clearCookie("connect.sid");
                res.redirect('/login');
            });
            return;
        }
        next();
    });
});
  
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

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