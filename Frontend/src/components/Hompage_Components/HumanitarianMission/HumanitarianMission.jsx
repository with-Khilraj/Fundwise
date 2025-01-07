import React from 'react';
import './HumanitarianMission.css';
import HumanitarianMissionimage from '../../../assets/Group-17.png'; // Update the path to your image

const HumanitarianMission = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className='content-text'>Humanitarian Mission</h1>
        <h2>Help the Affected by <span className="highlight">Disasters, Shortages,</span> and <span className="highlight">Emergency Relief.</span></h2>
        <div className="stats">
          <div className="stat-item">
            <h3>22,690</h3>
            <p>Donations have been verified and still active.</p>
          </div>
          <div className="stat-item">
            <h3>6,450</h3>
            <p>Donations have been distributed to disaster-affected areas.</p>
          </div>
          <div className="stat-item">
            <h3>528008</h3>
            <p>total funds raised so far.</p>
          </div>
          <div className="stat-item">
            <h3>10,517</h3>
            <p>donations have been distributed to the needy.</p>
          </div>
          <div className="stat-item">
            <h3>5,058</h3>
            <p>donations were distributed to social foundations and orphanages.</p>
          </div>
          <div className="stat-item">
            <h3>4,803</h3>
            <p>donations have been distributed to people in emergency situations.</p>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={HumanitarianMissionimage} alt="Humanitarian Aid" />
      </div>
    </div>
  );
};

export default HumanitarianMission;
