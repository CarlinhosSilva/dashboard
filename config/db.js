const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;
    
    try {
        await mongoose.connect(dbURI);
        console.log(`MongoDB conectado no ambiente ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error('Erro ao conectar no MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
