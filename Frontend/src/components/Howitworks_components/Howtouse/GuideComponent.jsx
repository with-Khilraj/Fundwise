// GuideComponent.jsx
import React from 'react';
import './GuideComponent.css';
import GroupImage from '../../../assets/groupImage.png'; // Import the single group image

const GuideComponent = () => {
  return (
    <div className="Guidcontainer">
      <h1 className="title">How to Use <span>Fundwise</span></h1>
      <h2 className='title2'>Platform Guide!</h2>
      <div className="imageContainer">
        <img src={GroupImage} className="fullImage" alt="Group showing support" />
      </div>
    </div>
  );
}

export default GuideComponent;
