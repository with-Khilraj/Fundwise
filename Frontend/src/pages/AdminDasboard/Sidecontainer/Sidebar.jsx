import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../components/Context/UserContext'; // Import useUser hook

import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const { user } = useUser(); // Get user from context

  const handleLogout = () => {
    onLogout(); // Use the onLogout function passed from AdminDashboard
    
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
        <hr className="header-underline" />
      </div>
      <ul>
        <li><NavLink to="/admin" end className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/admin/user-list" className={({ isActive }) => isActive ? "active-link" : ""}>User List</NavLink></li>
        <li><NavLink to="/admin/donation-list" className={({ isActive }) => isActive ? "active-link" : ""}>Donation List</NavLink></li>
        <li><NavLink to="/admin/all-campaigns" className={({ isActive }) => isActive ? "active-link" : ""}>All Campaigns</NavLink></li>
        <li><NavLink to="/admin/contact-list" className={({ isActive }) => isActive ? "active-link" : ""}>Contact List</NavLink></li>
      </ul>
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
