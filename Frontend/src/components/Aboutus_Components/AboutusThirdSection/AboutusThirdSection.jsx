import React from 'react';
import './AboutusThirdSection.css';
import ProtestImage from '../../../assets/protestImage.png'; // Make sure the image path is correct

function AboutusThirdSection() {
  return (
    <div className="voiceContainer">
      <div className="textSection">
        <h1>We believe in your voice</h1>
        <div className="paragraphContainer">
          <p className="leftColumn">
            We're in here with a simple and clear mission is building a powerful platform for the change, helping people around the world to raise their voices, collecting signatures and contribute to the world.
          </p>
          <p className="rightColumn">
            At Conikal, We believe that the power to change the world is in all human beings, we also believe that when everyone speaks out the problem of society and action together, the world will become a better place.
          </p>
        </div>
      </div>
      <img src={ProtestImage} alt="Protest" className="protestImage" />
    </div>
  );
}

export default AboutusThirdSection;
