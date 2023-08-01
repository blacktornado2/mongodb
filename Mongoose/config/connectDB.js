const mongoose = require("mongoose");

const connectDB = async DB_URL => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connection Successful!!");
    } catch (error) {
        console.log(`Error in connecting to DB: ${error.message}`);
    }
};

module.exports = connectDB;
