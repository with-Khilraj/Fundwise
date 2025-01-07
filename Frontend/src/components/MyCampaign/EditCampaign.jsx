import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditCampaign.css';

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    title: '',
    story: '',
    goal: 0,
    endDate: '',
    image: null,
  });

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCampaign(response.data);
    } catch (error) {
      console.error('Error fetching campaign:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setCampaign({ ...campaign, image: files[0] });
    } else {
      setCampaign({ ...campaign, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', campaign.title);
      formData.append('story', campaign.story);
      formData.append('goal', campaign.goal);
      formData.append('endDate', campaign.endDate);
      if (campaign.image) {
        formData.append('image', campaign.image);
      }

      const response = await axios.put(`http://localhost:5500/api/campaigns/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/my-campaigns');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error updating campaign:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="edit-campaign">
      <h2>Edit Campaign</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={campaign.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Story</label>
          <textarea name="story" value={campaign.story} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Goal</label>
          <input type="number" name="goal" value={campaign.goal} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={campaign.endDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCampaign;
