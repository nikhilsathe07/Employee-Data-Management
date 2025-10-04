import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EditEmployeeModal from "./components/EditEmployeeModal";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://employee-data-management-qyg7.onrender.com/api/employees"
      );
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await fetch(
        "https://employee-data-management-qyg7.onrender.com/api/positions"
      );
      if (!response.ok) throw new Error("Failed to fetch positions");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

  useEffect(() => {
    fetchPositions();
  }, [isAddEmployeeModalOpen, isEditModalOpen]);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterPosition || employee.position === filterPosition)
  );

  return (
    <div>
      <Navbar
        onSearch={setSearchTerm}
        onFilter={setFilterPosition}
        onAddEmployeeModalOpen={() => setIsAddEmployeeModalOpen(true)}
        positions={positions}
      />
      <div className="container">
        {/* <h2>Employee Management</h2> */}
        <EmployeeTable
          employees={filteredEmployees}
          fetchEmployees={fetchEmployees}
          onEdit={handleEdit}
        />
        <AddEmployeeModal
          isOpen={isAddEmployeeModalOpen}
          onClose={() => setIsAddEmployeeModalOpen(false)}
          onAddEmployee={fetchEmployees}
        />
        <EditEmployeeModal
          employee={selectedEmployee}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={fetchEmployees}
        />
      </div>
    </div>
  );
}

export default App;
