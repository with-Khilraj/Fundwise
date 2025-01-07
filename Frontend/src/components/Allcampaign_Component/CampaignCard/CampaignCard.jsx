import React from 'react';
import './CampaignCard.css';
import { Link } from 'react-router-dom';

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const CampaignCard = ({ _id, image, title, story, raised, goal, topDonors = [], comments = [], daysLeft, donations }) => {
  const truncatedDescription = truncateText(story, 100); // Truncate description to 100 characters
  const supporters = donations ? donations.length : 0;

  return (
    <Link to={`/campaign/${_id}`} state={{ campaign: { _id, image, title, story, raised, goal, topDonors, comments, daysLeft, donations } }} className="campaign-card-link">
      <div className="campaign-card">
        <img src={`http://localhost:5500${image}`} alt={title} className="campaign-card-image" onError={(e) => { e.target.onerror = null; e.target.src = "fallback_image_url"; }} />
        <div className="campaign-card-content">
          <h3 className="campaign-card-title">{title}</h3>
          <p className="campaign-card-description">{truncatedDescription}</p>
          <div className="campaign-card-info">
            <p className="campaign-card-raiser">Rs {raised.toLocaleString()} Raised</p>
            <p className="campaign-card-supporters">{supporters} Supporters</p>
            <p className="campaign-card-comments">{comments.length} Comments</p>
            <p className="campaign-card-days-left">{daysLeft} days left</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(raised / goal) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
