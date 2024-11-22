import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the navbar component
import UserTable from './components/UserTable'; // Import UserTable component
import RoleTable from './components/RoleTable'; // Import RoleTable component
import './App.css'; // Optional, for styling
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        {/* Render the navigation bar */}
        <Navbar />

        {/* Define routing for the different pages */}
        <Routes>
          <Route path="/" element={<UserTable />} /> {/* Default Route */}
          <Route path="/users" element={<UserTable />} /> {/* Users Table Route */}
          <Route path="/roles" element={<RoleTable />} /> {/* Roles Table Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
