import React from 'react';
import './SeconSection.css';
import CampaignImage from '../../../assets/CampaignImage.png'; // Ensure you have this image in your assets folder

function SeconSection() {
  return (
    <div className="campaignContainer">
      <p className="mainText">
        People everywhere are empowered to start campaigns, mobilize supporters, and work with Decision Makers to drive solutions.
      </p>
      <img src={CampaignImage} alt="Campaign Crowd" className="campaignImage" />
      <div className="infoSections">
        <div className="infoSection">
          <p>Learn the best ways to gain support for your cause and make change!</p>
          <button className="circleButton">→</button>
        </div>
        <div className="infoSection">
          <p>We’ll take you through the step by step process from starting your petition to victory.</p>
          <button className="circleButton">→</button>
        </div>
      </div>
    </div>
  );
}

export default SeconSection;
