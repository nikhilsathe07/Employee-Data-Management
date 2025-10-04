const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "Server is healthy" });
});

// Fetch all employees
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    next(err); // Pass error to error handler
  }
});


// Fetch unique positions
router.get("/positions", async (req, res, next) => {
  try {
    const positions = await Employee.distinct("position");
    res.json(positions);
  } catch (err) {
    next(err);
  }
});

// Add a new employee
router.post("/employees", async (req, res, next) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// Update an employee
router.put("/employees/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, position } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, position },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

// Delete an employee
router.delete("/employees/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
