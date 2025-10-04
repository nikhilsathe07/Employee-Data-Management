const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected ok");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
