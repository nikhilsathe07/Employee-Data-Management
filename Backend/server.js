const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employee");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend origin

// Connect to MongoDB
connectDB();

app.get("/health-check", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api", employeeRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
