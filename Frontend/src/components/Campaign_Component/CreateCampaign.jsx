import React, { useState, useRef } from 'react';
import { createCampaign } from '../../api/campaigns';
import './CreateCampaign.css';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [goal, setGoal] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('story', story);
    formData.append('goal', goal);
    formData.append('endDate', endDate);
    formData.append('image', image);
  
    try {
      // Get the CSRF token from cookies
      const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
  
      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }
  
      const response = await createCampaign(formData, csrfToken); // Pass the CSRF token to the createCampaign function
      console.log('Campaign created successfully:', response);
      setShowPopup(true);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTitle('');
    setStory('');
    setGoal('');
    setEndDate('');
    setImage(null);
    setImagePreview(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="create-campaign-page" ref={formRef}>
      {showPopup && (
        <div className="centered-popup">
          <p>Campaign created successfully!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      <div className="left-section">
        <h3>Let's begin <span>your fundraising</span> journey</h3>
        <p>We're here to guide you every step of the way</p>
      </div>
      <div className="right-section">
        <h2>Create campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Campaign Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Story</label>
            <textarea value={story} onChange={(e) => setStory(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Goal</label>
            <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Campaign Image</label>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Campaign" className="image-preview" />}
          </div>
          <button type="submit" className="submit-button">Start a Campaign</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
