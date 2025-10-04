import React, { useState, useEffect } from "react";
import "./EditEmployeeModal.css";

const EditEmployeeModal = ({ employee, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        position: employee.position || "",
      });
      setErrors({});
    }
  }, [employee]);

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
      const response = await fetch(
        `http://localhost:5000/api/employees/${employee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        onUpdate(); // Notify parent to refresh employee list
        onClose(); // Close modal
      } else {
        const errorData = await response.json();
        alert(
          `Failed to update employee: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      alert(`Error updating employee: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h3>Edit Employee</h3>
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="editName">Name</label>
            <input
              type="text"
              id="editName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="editEmail">Email</label>
            <input
              type="email"
              id="editEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="editPosition">Position</label>
            <input
              type="text"
              id="editPosition"
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
