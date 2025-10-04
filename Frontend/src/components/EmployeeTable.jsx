import "./EmployeeTable.css";

const EmployeeTable = ({ employees, fetchEmployees, onEdit }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchEmployees();
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        alert(`Error deleting employee: ${error.message}`);
      }
    }
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.position}</td>
            <td className="actions">
              <button
                className="btn btn-primary"
                onClick={() => onEdit(employee)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(employee._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
