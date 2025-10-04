const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    position: { type: String, required: true },
  },
  { collection: "employee" }
);

module.exports = mongoose.model("Employee", employeeSchema);
