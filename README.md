Employee Management System

Project Overview

A simple CRUD (Create, Read, Update, Delete) application built with Vite, React.js, and a Node.js backend to manage a list of employees. The application uses MongoDB Atlas (cloud-based) for data persistence and provides a clean, user-friendly interface with RESTful API integration.

Features





Backend:





RESTful API endpoints (/api/employees) for full CRUD operations.



Employee data includes name, email, and position.



MongoDB Atlas (free tier) for cloud-based data storage.



Frontend:





Displays employees in a responsive table or list.



Form to add new employees.



Edit and Delete functionality for each employee (edit via modal or separate page).



Bonus Features:





Search/filter bar to find employees by name.



Frontend form validation for user input.



Backend unit tests for CRUD endpoints and core business logic.

Tech Stack





Frontend: Vite, React.js, Tailwind CSS



Backend: Node.js, Express.js, MongoDB (via MongoDB Atlas)



Testing: Jest (or another testing framework for backend tests)



Dependencies:





React, React DOM, React Router (for navigation)



Axios (for API calls)



Mongoose (for MongoDB interaction)



Express (for backend server)

Installation





Clone the repository:

git clone <repository-url>
cd employee-management-system



Backend Setup:





Navigate to the backend directory:

cd backend
npm install



Create a .env file in the backend directory with your MongoDB Atlas connection string:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/employeeDB?retryWrites=true&w=majority

Replace <username>, <password>, and cluster0.mongodb.net with your MongoDB Atlas credentials and cluster details.



Start the backend server:

npm start



The server will run on http://localhost:5000.



Frontend Setup:





Navigate to the frontend directory:

cd frontend
npm install



Start the Vite development server:

npm run dev



The frontend will be available at http://localhost:5173.



Database:





MongoDB Atlas is used for cloud-based storage. Ensure your MongoDB Atlas cluster is set up and the connection string is added to the .env file.



The database (employeeDB) and collection (employees) will be created automatically upon the first API call.

Usage





View Employees: Open the app in your browser to see the list of employees.



Add Employee: Use the form to add a new employee with name, email, and position.



Edit Employee: Click the "Edit" button on an employee row to update their details.



Delete Employee: Click the "Delete" button to remove an employee.



Search Employees: Use the search bar to filter employees by name.

API Endpoints





GET /api/employees: Retrieve all employees.



GET /api/employees/:id: Retrieve a single employee by ID.



POST /api/employees: Create a new employee.



PUT /api/employees/:id: Update an existing employee.



DELETE /api/employees/:id: Delete an employee.
