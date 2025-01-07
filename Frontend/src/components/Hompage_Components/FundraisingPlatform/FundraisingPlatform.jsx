// src/FundraisingPlatform.js
import React from 'react';
import './FundraisingPlatform.css';
import image1 from '../../../assets/third-section-image1.png'
import image2 from '../../../assets/third-section-image2.png'
import image3 from '../../../assets/third-section-image3.png'
import image4 from '../../../assets/third-section-image4.png'
import image5 from '../../../assets/arrrow.png'


const FundraisingPlatform = () => {
    return (
        <div className="fundraising-platform">
            <div className="images-section">
                <img src={image1} alt="Image 1" className="image image1" />
                <img src={image2} alt="Image 2" className="image image2" />
                <img src={image3} alt="Image 3" className="image image3" />
                <img src={image4} alt="Image 4" className="image image4" />
            </div>
            <div className="text-section">
                <h1 className="title">We are the Powerful, <span className="highlight">Free Fundraising Platform</span></h1>
                <p className="description">Proven, multi-purpose crowdfunding technology for effective organizational individual fundraising.</p>
                <ul className="features">
                    <li><span className="feature-icon"><img src={image5} alt="image5" /></span> Start your campaigns</li>
                    <li><span className="feature-icon"><img src={image5} alt="image5" /></span> Share with family and friends</li>
                    <li><span className="feature-icon"><img src={image5} alt="image5" /></span> Manage Donations</li>
                </ul>
            </div>
        </div>
    );
};

export default FundraisingPlatform;


