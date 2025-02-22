const mongoose = require('mongoose');

const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.log('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectMongoDB;