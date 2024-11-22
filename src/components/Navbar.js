import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RBAC Dashboard</Link> {/* Home link */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link> {/* Link to Users Table */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roles">Roles</Link> {/* Link to Roles Table */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
