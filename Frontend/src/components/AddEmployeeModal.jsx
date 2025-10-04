import React, { useState } from "react";
import "./AddEmployeeModal.css";

const AddEmployeeModal = ({ isOpen, onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.position) newErrors.position = "Position is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onAddEmployee();
        setFormData({ name: "", email: "", position: "" });
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Failed to add employee: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error adding employee: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h3>Add Employee</h3>
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="addName">Name</label>
            <input
              type="text"
              id="addName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="addEmail">Email</label>
            <input
              type="email"
              id="addEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="addPosition">Position</label>
            <input
              type="text"
              id="addPosition"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            {errors.position && (
              <span className="error">{errors.position}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
