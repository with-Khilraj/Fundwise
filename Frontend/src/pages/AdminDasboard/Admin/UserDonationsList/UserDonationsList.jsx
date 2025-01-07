import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserDonationsList.css';

const UserDonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [campaignIdToDelete, setCampaignIdToDelete] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Fetching donations with token:", token);
      const response = await axios.get('http://localhost:5500/api/campaigns/donations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Donations fetched:", response.data);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations', error.response ? error.response.data : error.message);
    }
  };

  const confirmDelete = (campaignId, donationId) => {
    console.log(`Confirming deletion of donation ID: ${donationId} from campaign ID: ${campaignId}`);
    setCampaignIdToDelete(campaignId);
    setDonationToDelete(donationId);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Deleting donation ID: ${donationToDelete} from campaign ID: ${campaignIdToDelete}`);
      await axios.delete(`http://localhost:5500/api/campaigns/donations/${campaignIdToDelete}/${donationToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(donations.filter((donation) => donation.donationId !== donationToDelete));
      setShowPopup(false);
      setDonationToDelete(null);
      setCampaignIdToDelete(null);
      toast.success('Donation successfully deleted');
    } catch (error) {
      console.error('Error deleting donation:', error.response ? error.response.data : error.message);
      setShowPopup(false);
      setDonationToDelete(null);
      setCampaignIdToDelete(null);
      toast.error(`Error deleting donation: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setDonationToDelete(null);
    setCampaignIdToDelete(null);
  };

  return (
    <div className="donation-list">
      <h2>User Donations List</h2>
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th>Campaign Image</th>
            <th>Campaign Title</th>
            <th>Donor</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(donations) ? (
            donations.map((donation) => (
              <tr key={donation.donationId}>
                <td>
                  <img 
                    src={`http://localhost:5500${donation.campaignImage}`} 
                    alt={donation.campaignTitle} 
                    className="admin-campaign-image" 
                    onError={(e) => { e.target.src = '/path/to/default/image.png'; }} // Fallback image
                  />
                </td>
                <td>
                  <span className="admin-campaign-title">{donation.campaignTitle}</span>
                </td>
                <td>{donation.donorName}</td>
                <td>{donation.amount}</td>
                <td>
                  <button className="delete-button" onClick={() => confirmDelete(donation.campaignId, donation.donationId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No donations found.</td>
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
    </div>
  );
};

export default UserDonationsList;
