import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidecontainer/Sidebar';
import UserList from '../UserList/UserList';
import AdminCampaignsList from '../userCampaign/AdminCampaignsList';
import UserDonationsList from './UserDonationsList/UserDonationsList';
import AdminInsightDashboard from './AdminInsightDashboard/AdminInsightDashboard';
import AdminContactList from '../AdminContactList/AdminContactList';
import { useUser } from '../../../components/Context/UserContext';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser(); // Get the logout function from the context

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log('Token:', token);
    console.log('Role:', role);
    console.log('Location:', location.pathname);
    if (!token || role !== 'admin') {
      navigate('/');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    logout(); // Use the context logout function
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <Sidebar onLogout={handleLogout} />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminInsightDashboard />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="donation-list" element={<UserDonationsList />} />
          <Route path="all-campaigns" element={<AdminCampaignsList />} />
          <Route path="contact-list" element={<AdminContactList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
