import React from 'react';
import './AboutusFirstSection.css';
import TeamImage from '../../../assets/teamImage.png'; // Adjust the path as needed

function AboutusFirstSection() {
  return (
    <div className="platformContainer">
      <h1 className="platformTitle">World’s Best Platform</h1>
      <p className="platformDescription">
        We started in 2024 with the radical idea that anyone, anywhere, should be able to easily and securely start their own petition.
        Today, we offer a trusted and easy-to-use platform for social movement across the world.
      </p>
      <img src={TeamImage} alt="Team Working" className="teamImage" />
    </div>
  );
}

export default AboutusFirstSection;
