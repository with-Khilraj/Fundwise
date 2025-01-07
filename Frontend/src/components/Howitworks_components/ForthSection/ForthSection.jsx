import React from 'react';
import './ForthSection.css';
import FistsImage from '../../../assets/ForthImageSection.png'; // Ensure the image path is correct

function ForthSection() {
  return (
    <div className="startCampaignContainer">
      <img src={FistsImage} alt="Raised Fists" className="fistsImage" />
      <div className="campaignTextContainer">
        <h2 className="campaignTitle">Start one today!</h2>
        <p className="campaignDescription">
          People everywhere are empowered to start campaigns, mobilize supporters, and work with Decision Makers to drive solutions.
        </p>
        <button className="startButton">
          <i className="fas fa-hand-paper"></i> Start a funding
        </button>
      </div>
    </div>
  );
}

export default ForthSection;
