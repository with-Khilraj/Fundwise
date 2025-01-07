import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminCampaignsList.css';

const AdminCampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/api/campaigns', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);  // Log the response data to verify
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns', error.response ? error.response.data : error.message);
    }
  };

  const confirmDelete = (id) => {
    setCampaignToDelete(id);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5500/api/campaigns/${campaignToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(campaigns.filter((campaign) => campaign._id !== campaignToDelete));
      setShowPopup(false);
      setCampaignToDelete(null);
      toast.success('Campaign deleted successfully!');
    } catch (error) {
      console.error('Error deleting campaign', error);
      setShowPopup(false);
      setCampaignToDelete(null);
    }
  };

  const handleUpdate = async (id) => {
    // Handle campaign update logic
  };

  const closePopup = () => {
    setShowPopup(false);
    setCampaignToDelete(null);
  };

  return (
    <div className="campaign-list">
      <h2>All User Campaigns</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Story</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>End Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(campaigns) ? (
            campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td>{campaign.title}</td>
                <td>{campaign.story}</td>
                <td>{campaign.goal}</td>
                <td>{campaign.raised}</td>
                <td>{new Date(campaign.endDate).toLocaleDateString()}</td>
                <td>{campaign.createdBy ? campaign.createdBy.firstName : 'N/A'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleUpdate(campaign._id)}>Edit</button>
                  <button className="delete-button" onClick={() => confirmDelete(campaign._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No campaigns found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Are you sure you want to delete?</h3>
            <button className="popup-button delete-button" onClick={handleDelete}>Yes</button>
            <button className="popup-button cancel-button" onClick={closePopup}>No</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminCampaignsList;
