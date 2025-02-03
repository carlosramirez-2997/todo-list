const { createClient } = require("redis");

const redisClient = createClient({ url: process.env.REDIS_URI});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

const connectRedis = async() => {
    try {
        await redisClient.connect();
        console.log('✅ Redis Connected');
    } catch (err) {
        console.log('❌ Redis Connection Error:', err);
        process.exit(1);
    }
}

module.exports = { redisClient, connectRedis };