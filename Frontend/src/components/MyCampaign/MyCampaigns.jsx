import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MyCampaigns.css';

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5500/api/campaigns/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data.campaigns || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-campaigns">
      <h2>My Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>You have not created any campaigns yet.</p>
      ) : (
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td>{campaign.title}</td>
                <td>{campaign.status}</td>
                <td>
                  <Link to={`/edit-campaign/${campaign._id}`} className="edit-link">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCampaigns;
